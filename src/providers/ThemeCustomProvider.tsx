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
  toggleModeDark: () => void;
  customTheme?: Theme;
  changeColor: (availablecolors: availableColorsType) => void;
  checkTheme: (refresh: boolean) => void;
  changeFontSize: (size: number) => void;
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

  const toggleModeDark = () => {
    const modeDark = customTheme?.palette.mode === "dark";
    const newModeTheme = { ...customThemeStorage } as Theme;
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
    setCustomTheme(createTheme({ ...newModeTheme, cssVariables: true }));
    window.localStorage.setItem("customTheme", JSON.stringify(newModeTheme));
  }

  const changeColor = ({ color, secondary }: availableColorsType) => {
    const newModeTheme = { ...customThemeStorage } as Theme;
    newModeTheme.palette.primary.main = color;
    newModeTheme.palette.secondary.main = secondary;

    setCustomTheme(createTheme(newModeTheme));
    window.localStorage.setItem("customTheme", JSON.stringify(newModeTheme));
  };

  const checkTheme = useCallback((refresh: boolean = false) => {
    let temaDark: boolean;
    if (customThemeStorage === undefined || refresh) {
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
      setCustomTheme(createTheme(customThemeStorage));
    }
    //console.log('checkTheme render')
  }, []);

  const changeFontSize = (size: number) => {
    const newModeTheme = { ...customThemeStorage } as Theme;
    newModeTheme.typography.fontSize = size;
    setFontSize(size);
    setCustomTheme(createTheme(newModeTheme));
    window.localStorage.setItem("customTheme", JSON.stringify(newModeTheme));
  };

  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) { checkTheme() }
    return () => {
      isActive = false;
      ca.abort();
    }
  }, [checkTheme]);

  const values = { modeDark, toggleModeDark, customTheme, changeColor, checkTheme, changeFontSize, fontSize };
  return <ThemeCustomContext.Provider value={values}>
    {children}
  </ThemeCustomContext.Provider>;
}

export default ThemeCustomProvider;
