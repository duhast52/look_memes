import React, { FC, useEffect } from "react";
import "./stylesheets/index.css";
import { useActions } from "./hooks/useActions";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { Routes } from "./Routes";
import { webAppRoutes } from "./constants";
import { AppContextProvider } from "./context/AppContext";

const App: FC = () => {
  const { setIsAuth } = useActions();

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
  }, []);

  return (
    <>
      <AppContextProvider>
        <Router basename={webAppRoutes.base}>
          <ScrollToTop />
          <Routes />
        </Router>
      </AppContextProvider>
    </>
  );
};

export default App;
