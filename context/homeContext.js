import React, {createContext, useContext, useEffect, useState} from 'react';
import {fetchAxios} from '../utilities/fetchAxios';

export const HomeContext = createContext(null);

const HomeContextProvider = ({children}) => {
  const [dataOuter, setDataOuter] = useState([]);
  const [dataInner, setDataInner] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [changePosition, setChangePosition] = useState(false);

  useEffect(() => {
    if (!changePosition) fetchDataOuter();
  }, []);

  useEffect(() => {
    if (dataOuter && !changePosition) {
      fetchDataInner();
    }
  }, [dataOuter]);

  useEffect(() => {
    resetData();
    fetchDataOuter();
    if (dataOuter) {
      fetchDataInner();
    }
  }, [refresh]);

  const resetData = () => {
    setDataOuter(null);
    setDataInner(null);
  };

  const refreshData = () => {
    setRefresh(true);
  };

  const fetchDataOuter = async () => {
    const data1 = await fetchAxios('https://v2.jokeapi.dev/categories');
    if (data1) setDataOuter(data1);
  };

  const fetchDataInner = async () => {
    const category = dataOuter?.data?.categories;
    if (category) {
      try {
        const responses = await Promise.all(
          category.map(async cat => {
            const data = await fetchAxios(
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
        setRefresh(false);
      } catch (e) {}
    }
  };

  const arrangeOuterData = index => {
    setDataOuter(prevState => {
      if (!prevState?.data?.categories) return prevState;
      const newCategories = [...prevState.data.categories];
      const selectedItem = newCategories.splice(index, 1)[0];
      newCategories.unshift(selectedItem);
      return {
        ...prevState,
        data: {
          ...prevState.data,
          categories: newCategories,
        },
      };
    });
  };

  const arrangeInnerData = index => {
    setDataInner(prevState => {
      if (!prevState) return prevState;

      const newData = [...prevState];
      const selectedItem = newData.splice(index, 1)[0];
      newData.unshift(selectedItem);
      return newData;
    });
  };

  const goTop = (index = 0) => {
    arrangeOuterData(index);
    arrangeInnerData(index);
  };

  const addData = async (category = '', index = 0) => {
    const res = await fetchAxios(
      `https://v2.jokeapi.dev/joke/${category}?type=single&amount=2`,
    );
    const newJoke = res?.data?.jokes;

    setDataInner(prevState => {
      const updatedData = [...prevState];
      if (updatedData[index]) {
        updatedData[index] = {
          ...updatedData[index],
          jokes: [...updatedData[index].jokes, ...newJoke],
        };
      }

      return updatedData;
    });
  };

  const openModal = (title = '') => {
    setModalContent(title);
    setModal(true);
  };

  const closeModal = () => {
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
        refreshData,
        addData,
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
