import React, {createContext, useContext, useState} from 'react';
export const HomeContext = createContext(null);

const HomeContextProvider = ({children}) => {
  const [data, setData] = useState('cek context 1');
  return (
    <HomeContext.Provider
      value={{
        data,
        setData,
      }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (context) return context;
};

export default HomeContextProvider;
