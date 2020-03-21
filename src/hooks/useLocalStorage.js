import React, { useEffect, useState } from "react";

const useLocalStorage = (key, initialState = "") => {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    if (localStorage.getItem(key)) {
      setData(JSON.parse(localStorage.getItem(key)));
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, []);

  return [data];
};

export default useLocalStorage;
