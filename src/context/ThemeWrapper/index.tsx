"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface AppContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("light");

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("data-theme", newTheme);
    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark" ||
        (newTheme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  };

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("data-theme") as Theme) || "system";
    setTheme(savedTheme);
  }, []);

  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};
