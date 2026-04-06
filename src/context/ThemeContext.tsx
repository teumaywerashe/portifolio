"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  textMain: string;
  textSecondary: string;
  border: string;
}

interface ThemeContextType {
  theme: ThemeColors;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const themeColors: Record<"light" | "dark", ThemeColors> = {
  light: {
    background: "#ffffff",
    surface: "#f8fafc",
    primary: "#4f46e5",
    textMain: "#0f172a",
    textSecondary: "#475569",
    border: "#e2e8f0",
  },
  dark: {
    background: "#020617",
    surface: "#0f172a",
    primary: "#818cf8",
    textMain: "#f8fafc",
    textSecondary: "#94a3b8",
    border: "#1e293b",
  },
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("portfolio-theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const theme = isDarkMode ? themeColors.dark : themeColors.light;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export { ThemeProvider };
export default useTheme;
