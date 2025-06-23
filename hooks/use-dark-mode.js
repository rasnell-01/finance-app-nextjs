import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useDarkMode = (defaultTheme = 'dark') => {
  const [theme, setTheme] = useState(() => Cookies.get('theme') || defaultTheme);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const setAndSaveTheme = (newTheme) => {
    setTheme(newTheme);
    Cookies.set('theme', newTheme, { expires: 365 });
  };

  const toggleTheme = () => {
    setAndSaveTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
};

export default useDarkMode;
