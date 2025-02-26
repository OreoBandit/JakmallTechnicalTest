import React, {createContext, useContext, useEffect, useState} from 'react';
import {useAxios} from '../utilities/useAxios';

export const HomeContext = createContext(null);

const HomeContextProvider = ({children}) => {
  const [dataOuter, setDataOuter] = useState([]);
  const [dataInner, setDataInner] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [changePosition, setChangePosition] = useState(false);

  const outerListViewURL = 'https://v2.jokeapi.dev/categories';
  useEffect(() => {
    console.log('cek ', changePosition);
    if (!changePosition) fetchDataOuter();
  }, []);

  useEffect(() => {
    if (dataOuter && !changePosition) {
      fetchDataInner();
    }
  }, [dataOuter]);

  const fetchDataOuter = async () => {
    const data1 = await useAxios(outerListViewURL);

    if (data1) setDataOuter(data1);
    console.log('cek fetch 1', data1);
  };

  const fetchDataInner = async () => {
    const category = dataOuter?.data?.categories;
    if (category) {
      try {
        const responses = await Promise.all(
          category.map(async cat => {
            const data = await useAxios(
              `https://v2.jokeapi.dev/joke/${cat}?type=single&amount=2`,
            );
            return {
              category: cat,
              jokes: data?.data?.jokes || [],
            };
          }),
        );
        setDataInner(responses);
        setChangePosition(true);
      } catch (e) {}
    }
  };

  const goTop = (index = 0) => {
    setDataOuter(prevState => {
      if (!prevState?.data?.categories) return prevState;
      const newCategories = [...prevState.data.categories];
      const selectedItem = newCategories.splice(index, 1)[0];
      newCategories.unshift(selectedItem);
      console.log('new cat', newCategories);
      return {
        ...prevState,
        data: {
          ...prevState.data,
          categories: newCategories,
        },
      };
    });

    setDataInner(prevState => {
      if (!prevState) return prevState;

      const newData = [...prevState];
      const selectedItem = newData.splice(index, 1)[0];
      newData.unshift(selectedItem);
      console.log('new inner data', newData);
      return newData;
    });
  };

  const openModal = (title = '') => {
    console.log('triggered open');
    setModalContent(title);
    setModal(true);
  };

  const closeModal = () => {
    console.log('triggered close');
    setModal(false);
    setModalContent('');
  };

  return (
    <HomeContext.Provider
      value={{
        outerList: dataOuter,
        nestedList: dataInner,
        openModal,
        closeModal,
        modal,
        modalContent,
        goTop,
      }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHomeContext must be used within a HomeContextProvider');
  }
  return context;
};

export default HomeContextProvider;
