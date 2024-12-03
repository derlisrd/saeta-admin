import { createContext } from "react";

interface ThemeTypeModeContextValuesType {
  modeDark: boolean;
  toggleTheme: () => void;
}

const ThemeTypeModeContext = createContext<ThemeTypeModeContextValuesType>({
  modeDark: true,
  toggleTheme: () => {},
});

export default ThemeTypeModeContext;
