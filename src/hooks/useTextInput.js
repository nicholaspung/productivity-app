import { useState } from "react";

const useTextInput = initialValue => {
  const [text, setText] = useState(initialValue || "");

  const handleChange = event => {
    setText(event.target.value);
  };

  return [text, setText, handleChange];
};

export default useTextInput;
