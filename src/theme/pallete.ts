import { PaletteOptions } from "@mui/material";

export const pallete = {
  mode: "dark",
  primary: {
    main: "#3ecf8e"
    // light: will be calculated from palette.primary.main,
    // dark: will be calculated from palette.primary.main,
    // contrastText: will be calculated to contrast with palette.primary.main
  },
  secondary: {
    main: "#E0C2FF",
    light: "#F5EBFF",
    // dark: will be calculated from palette.secondary.main,
    contrastText: "#47008F"
  },
  background: {
    default: "#242b33",
    paper: "#1f262e"
  },
  text:{
    primary: "#EDF2F7",
    secondary: "#A0AEC0"
  }
} as PaletteOptions;
