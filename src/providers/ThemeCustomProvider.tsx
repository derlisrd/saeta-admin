import { useLocalStorage } from "@/hooks/useLocalStorage";
import { components } from "@/theme/components";
import { pallete } from "@/theme/pallete";
import { colorsMode } from "@/theme/colors";
import { shadowsDark, shadowsLight } from "@/theme/shadows";
import { typography } from "@/theme/typography";
import { createTheme, Theme } from "@mui/material";
import { ReactNode, useCallback, useEffect, useState, createContext } from "react";
import { availableColorsType } from "@/core/types/availablecolors";

interface ThemeCustomContextValuesType {
  modeDark: boolean;
  toggleTheme: ({ toggleMode, availablecolors, size }: { toggleMode: boolean; availablecolors?: availableColorsType, size?: number }) => void;
  customTheme?: Theme;
  checkTheme: (refresh: boolean) => void;
  fontSize: number;
}

export const ThemeCustomContext = createContext<ThemeCustomContextValuesType | undefined>(undefined);

interface ThemeCustomProviderType { children: ReactNode; }

function ThemeCustomProvider({ children }: ThemeCustomProviderType) {
  const initialCustomTheme = {
    palette: pallete,
    components: components(),
    typography: typography,
    shadows: shadowsDark,
  } as Theme;
  const { current: customThemeStorage, setItemValue: setCustomThemeStorage } = useLocalStorage<Theme>("customTheme", initialCustomTheme);

  const [customTheme, setCustomTheme] = useState<Theme>();
  const [fontSize, setFontSize] = useState<number>(customThemeStorage?.typography.fontSize || 12);

  const modeDark = customTheme?.palette.mode === "dark";

  const toggleTheme = ({ toggleMode, availablecolors, size }: { toggleMode: boolean; availablecolors?: availableColorsType, size?: number }) => {
    const modeDark = customTheme?.palette.mode === "dark";
    const newModeTheme = { ...customThemeStorage } as Theme;
    if (toggleMode) {
      if (modeDark) {
        newModeTheme.palette.mode = "light";
        newModeTheme.palette.background.default = colorsMode.light.bgdefault;
        newModeTheme.palette.background.paper = colorsMode.light.bgpaper;
        newModeTheme.palette.text.primary = colorsMode.light.textPrimary;
        newModeTheme.palette.text.secondary = colorsMode.light.textSecondary;
        newModeTheme.palette.divider = colorsMode.light.divider;
        newModeTheme.shadows = shadowsLight;

      } else {
        newModeTheme.palette.mode = "dark";
        newModeTheme.palette.background.default = colorsMode.dark.bgdefault;
        newModeTheme.palette.background.paper = colorsMode.dark.bgpaper;
        newModeTheme.palette.text.primary = colorsMode.dark.textPrimary;
        newModeTheme.palette.text.secondary = colorsMode.dark.textSecondary;
        newModeTheme.palette.divider = colorsMode.dark.divider;
        newModeTheme.shadows = shadowsDark;
      }
    }
    if (availablecolors) {
      newModeTheme.palette.primary.main = availablecolors.color;
      newModeTheme.palette.secondary.main = availablecolors.secondary;
    }
    if (size) {
      newModeTheme.typography.fontSize = size;
      setFontSize(size);
    }

    setCustomTheme(createTheme({ ...newModeTheme, cssVariables: true }));
    window.localStorage.setItem("customTheme", JSON.stringify(newModeTheme));
  }



  const checkTheme = useCallback((refresh: boolean = false) => {
    let temaDark: boolean;
    const storage = window.localStorage.getItem("customTheme");
    const storageTheme = storage ? JSON.parse(storage) : undefined;
    if (storageTheme === undefined || refresh) {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        temaDark = true;
      } else {
        temaDark = false;
      }
      const newModeTheme = { ...initialCustomTheme };
      newModeTheme.palette.mode = temaDark ? "dark" : "light";
      setFontSize(12)
      setCustomTheme(createTheme({ ...newModeTheme, cssVariables: true }));
      setCustomThemeStorage(newModeTheme);
    } else {
      setCustomTheme(createTheme(storageTheme));
    }
    console.log('checkTheme render')
  }, []);


  useEffect(() => {
    (() => {
      let temaDark: boolean;
      const storage = window.localStorage.getItem("customTheme");
      const storageTheme = storage ? JSON.parse(storage) : undefined;
      if (storageTheme === undefined) {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          temaDark = true;
        } else {
          temaDark = false;
        }
        const newModeTheme = { ...initialCustomTheme };
        newModeTheme.palette.mode = temaDark ? "dark" : "light";
        setFontSize(12)
        setCustomTheme(createTheme({ ...newModeTheme, cssVariables: true }));
        setCustomThemeStorage(newModeTheme);
      } else {
        setCustomTheme(createTheme(storageTheme));
      }
    })()
  }, []);

  const values = { modeDark, toggleTheme, customTheme, checkTheme, fontSize };
  return <ThemeCustomContext.Provider value={values}>
    {children}
  </ThemeCustomContext.Provider>;
}

export default ThemeCustomProvider;
