import React, { useEffect, useState } from "react";
import { ToastPopUp } from './popUps.styled';

function ErrorToast({ message, setErrorMessage }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true)
    };
    const timer = setTimeout(() => {
      setShow(false);
      setErrorMessage('');
    }, 6000);

    return () => clearTimeout(timer);
  }, [message, setErrorMessage]);


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
