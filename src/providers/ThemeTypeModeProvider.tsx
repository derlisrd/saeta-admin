import ThemeTypeModeContext from "@/contexts/ThemeTypeModeContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ReactNode, useCallback, useEffect, useState } from "react";

interface ThemeTypeModeProviderType {
  children: ReactNode;
}

function ThemeTypeModeProvider({ children }: ThemeTypeModeProviderType) {
  const [modeDark, setModeDark] = useState(true);
  const { current: storage, setItemValue: setStorage } = useLocalStorage<boolean | null>("themeModeDark", null);
  const toggleTheme = () => {
    setModeDark(!modeDark);
    setStorage(!modeDark);
  };

  const checkTheme = useCallback(() => {
    let temaDark: boolean;

    if (storage === null) {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        temaDark = true;
      } else {
        temaDark = false;
      }
      setStorage(temaDark);
    } else {
      setModeDark(storage);
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
