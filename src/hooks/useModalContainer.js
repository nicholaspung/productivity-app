import { useEffect } from "react";

const useModalContainer = (className, cb) => {
  useEffect(() => {
    const handleModal = event => {
      if (event.target.className === className) {
        cb();
      }
    };

    window.addEventListener("click", handleModal);

    return () => window.removeEventListener("click", handleModal);
  });
};

export default useModalContainer;
