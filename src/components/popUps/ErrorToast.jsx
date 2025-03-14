import React, { useEffect, useState } from "react";
import theme from "../../styles/theme";
import { ToastPopUp } from './popUps.styled';

function ErrorToast({ message, showError = false, setErrorMessage }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if(message) {
        setShow(true)
    };
    const timer = setTimeout(() => {
      setShow(false);
      setErrorMessage('');
    }, 6000); 

    return () => clearTimeout(timer);
  }, [message]);


  return (
    show && (
      <ToastPopUp
        onClick={() => setShow(false)}
      >
        {message || "Error message"}
      </ToastPopUp>
    )
  );
}

export default ErrorToast;
