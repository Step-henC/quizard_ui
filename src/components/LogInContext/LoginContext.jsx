import { createContext, useState } from "react";

export const LoginContext = createContext();
export const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState();

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
