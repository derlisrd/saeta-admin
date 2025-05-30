import { availableColorsType } from "@/core/types/availablecolors";
import { Theme } from "@mui/material";
import { createContext } from "react";

interface ThemeCustomContextValuesType {
  modeDark: boolean;
  toggleModeDark: () => void;
  customTheme?: Theme;
  changeColor: (availablecolors: availableColorsType) => void;
  checkTheme: (refresh: boolean) => void;
}

const ThemeCustomContext = createContext<ThemeCustomContextValuesType | undefined>(undefined);

export default ThemeCustomContext;
