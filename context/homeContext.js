import React, {createContext, useContext, useEffect, useState} from 'react';
import {useAxios} from '../utilities/useAxios';

export const HomeContext = createContext(null);

const HomeContextProvider = ({children}) => {
  const [dataOuter, setDataOuter] = useState(null); // Start as null
  const [dataNested, setDataNested] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const outerListViewURL = 'https://v2.jokeapi.dev/categories';
  useEffect(() => {
    const fetchData = async () => {
      const data1 = await useAxios(outerListViewURL);

      if (data1) setDataOuter(data1);
    };

    fetchData();
  }, []);

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
        nestedList: dataNested,
        openModal,
        closeModal,
        modal,
        modalContent,
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
