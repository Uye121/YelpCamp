import { useState, useEffect } from 'react';

export const useCampgrounds = () => {
  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    async function fetchCampgrounds() {
      fetch('http://localhost:5000/campgrounds/')
        .then((response) => response.json())
        .then((responseJson) => {
          setCampgrounds(responseJson);
        })
        .catch();
    }
    fetchCampgrounds();
  }, []);
  
  return { campgrounds, setCampgrounds };
}
