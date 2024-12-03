import ThemeTypeModeContext from "@/contexts/ThemeTypeModeContext";
import { ReactNode, useCallback, useEffect, useState } from "react";

interface ThemeTypeModeProviderType {
  children: ReactNode;
}

function ThemeTypeModeProvider({ children }: ThemeTypeModeProviderType) {
  const [modeDark, setModeDark] = useState(true);

  const toggleTheme = () => {
    setModeDark(!modeDark);
  };

  const checkTheme = useCallback(() => {
    const storage = localStorage.getItem("themeModeDark");
    let temaDark: boolean;

    if (storage === null) {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        temaDark = true;
      } else {
        temaDark = false;
      }
      localStorage.setItem("themeModeDark", String(temaDark));
    } else {
      console.log(storage === "true" ? true : false);
      setModeDark(storage === "true" ? true : false);
    }
  }, []);

  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) {
      checkTheme();
    }
    return () => {
      isActive = false;
      ca.abort();
    };
  }, [checkTheme]);

  const values = { modeDark, toggleTheme };
  return <ThemeTypeModeContext.Provider value={values}>{children}</ThemeTypeModeContext.Provider>;
}

export default ThemeTypeModeProvider;
