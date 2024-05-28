/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Notification = ({ message }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (message) {
      setErrorMessage(message);
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!errorMessage) {
    return null;
  }

  return <div className="added">{errorMessage.message}</div>;
};

export default Notification;
