import ThemeCustomContext from "@/contexts/ThemeCustomContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { components } from "@/theme/components";
import { pallete } from "@/theme/pallete";
import { colorsMode } from "@/theme/colors";
import { shadowsDark, shadowsLight } from "@/theme/shadows";
import { typography } from "@/theme/typography";
import { createTheme, Theme } from "@mui/material";
import { ReactNode, useCallback, useEffect, useState } from "react";

interface ThemeCustomProviderType {
  children: ReactNode;
}

function ThemeCustomProvider({ children }: ThemeCustomProviderType) {
  const initialCustomTheme = {
    palette: pallete,
    components: components,
    typography: typography,
    shadows: shadowsDark,
  } as Theme;
  const { current: customThemeStorage, setItemValue: setCustomThemeStorage } = useLocalStorage<Theme>("customTheme", initialCustomTheme);

  const [customTheme, setCustomTheme] = useState<Theme>();

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
      setCustomTheme(createTheme({ ...newModeTheme, cssVariables: true }));
      setCustomThemeStorage(newModeTheme);
    } else {
      newModeTheme.palette.mode = "dark";
      newModeTheme.palette.background.default = colorsMode.dark.bgdefault;
      newModeTheme.palette.background.paper = colorsMode.dark.bgpaper;
      newModeTheme.palette.text.primary = colorsMode.dark.textPrimary;
      newModeTheme.palette.text.secondary = colorsMode.dark.textSecondary;
      newModeTheme.palette.divider = colorsMode.dark.divider;
      newModeTheme.shadows = shadowsDark;
      setCustomTheme(createTheme({ ...newModeTheme, cssVariables: true }));
      setCustomThemeStorage(newModeTheme);
    }
  };

  const changeColor = (color: string, secondary: string) => {
    const newModeTheme = { ...customThemeStorage } as Theme;
    newModeTheme.palette.primary.main = color;
    newModeTheme.palette.secondary.main = secondary;
    setCustomTheme(createTheme(newModeTheme));
    setCustomThemeStorage(newModeTheme);
  };

  const checkTheme = useCallback(() => {
    let temaDark: boolean;
    if (customThemeStorage === undefined) {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        temaDark = true;
      } else {
        temaDark = false;
      }
      const newModeTheme = { ...initialCustomTheme };
      newModeTheme.palette.mode = temaDark ? "dark" : "light";
      setCustomTheme(createTheme(newModeTheme));
      setCustomThemeStorage(newModeTheme);
    } else {
      setCustomTheme(createTheme(customThemeStorage));
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

  const values = { modeDark, toggleModeDark, customTheme, changeColor };
  return <ThemeCustomContext.Provider value={values}>{children}</ThemeCustomContext.Provider>;
}

export default ThemeCustomProvider;
