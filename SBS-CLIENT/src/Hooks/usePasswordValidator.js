import { useEffect, useState } from "react";

const usePasswordValidator = (password = "") => {
  const [passwordErrors, setPasswordErrors] = useState({
    minLength: false,
    hasNumber: false,
    hasLowerCase: false,
    hasUpperCase: false,
    hasSymbol: false,
  });

  useEffect(() => {
    setPasswordErrors({
      minLength: password.length < 8,
      hasNumber: !/\d/.test(password),
      hasLowerCase: !/[a-z]/.test(password),
      hasUpperCase: !/[A-Z]/.test(password),
      hasSymbol: !/[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/.test(password),
    });
  }, [password]);

  const isPasswordValid = Object.values(passwordErrors).every(
    (error) => !error
  );

  return { passwordErrors, isPasswordValid };
};

export default usePasswordValidator;
