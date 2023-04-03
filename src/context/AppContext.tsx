import { createContext, ReactNode, useState } from "react";

export const AppContext = createContext({
  isCategoryView: false,
  setIsCategoryView: null,
});

interface IAppContextProvider {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: IAppContextProvider): JSX.Element => {
  const [isCategoryView, setIsCategoryView] = useState<boolean>(true);

  return (
    <AppContext.Provider
      value={{
        isCategoryView,
        setIsCategoryView,
      }}>
      {children}
    </AppContext.Provider>
  );
};
