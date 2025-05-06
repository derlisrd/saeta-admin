import { availableColorsType } from "@/core/types/availablecolors";
import { Theme } from "@mui/material";
import { createContext } from "react";

interface ThemeCustomContextValuesType {
  modeDark: boolean;
  toggleModeDark: () => void;
  customTheme?: Theme;
  changeColor: (availablecolors: availableColorsType) => void;
}

const ThemeCustomContext = createContext<ThemeCustomContextValuesType>({
  modeDark: true,
  toggleModeDark: () => {},
  customTheme: {} as Theme,
  changeColor: () => {},
});

export default ThemeCustomContext;
