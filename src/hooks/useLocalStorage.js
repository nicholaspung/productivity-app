import { useEffect, useState } from "react";

const useLocalStorage = (key, initialState = "") => {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    if (localStorage.getItem(key)) {
      setData(JSON.parse(localStorage.getItem(key)));
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return [data, setData];
};

export default useLocalStorage;
