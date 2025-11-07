import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";

interface AppContextProps {
  sideToggle: boolean;
  setSideToggle?: any;
  collapsed: boolean;
  setCollapsed?: any
}

export const AppContext = createContext<AppContextProps>({
  sideToggle: false,
  collapsed: false
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [sideToggle, setSideToggle] = useState(false);
  const [collapsed, setCollapsed] = useState(false);


  return (
    <AppContext.Provider value={{ sideToggle, setSideToggle, collapsed, setCollapsed }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}