import { useEffect, useState } from "react";

const useEmailValidator = (email = "") => {
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  return { isEmailValid };
};

export default useEmailValidator;
