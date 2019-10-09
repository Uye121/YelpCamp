import React, { useContext, createContext } from 'react';
import { useCampgrounds } from '../hooks';

export const CampgroundsContext = createContext();

export const CampgroundsProvider = ({children}) => {
  const { campgrounds, setCampgrounds } = useCampgrounds();

  return (
    <CampgroundsContext.Provider value={{campgrounds, setCampgrounds}}>
      {children}
    </CampgroundsContext.Provider>
  );
}

export const useCampgroundsValue = () => useContext(CampgroundsContext);
