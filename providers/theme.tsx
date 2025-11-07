import React, { createContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextProps {
  theme: string;
  toggleTheme?: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "dark"
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Check the user's preferred theme or fallback to light
    const userPreferredTheme = window.localStorage.getItem("theme") || "dark";
    setTheme(userPreferredTheme);
    document.documentElement.setAttribute("data-theme", userPreferredTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark"?"light":"dark"
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    window.localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};