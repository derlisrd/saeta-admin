import { Theme } from "@mui/material";
import { createContext } from "react";

interface ThemeCustomContextValuesType {
  modeDark: boolean;
  toggleModeDark: () => void;
  customTheme?: Theme;
  changeColor: (color: string, secondary: string) => void;
}

const ThemeCustomContext = createContext<ThemeCustomContextValuesType>({
  modeDark: true,
  toggleModeDark: () => {},
  customTheme: {} as Theme,
  changeColor: () => {},
});

export default ThemeCustomContext;
