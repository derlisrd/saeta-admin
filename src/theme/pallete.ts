import { PaletteOptions } from "@mui/material";

export const pallete = {
  mode: "dark",
  primary: {
    main: "#15a564",
    // light: will be calculated from palette.primary.main,
    // dark: will be calculated from palette.primary.main,
    // contrastText: will be calculated to contrast with palette.primary.main,
    contrastText: "#fff"
  },
  secondary: {
    main: "#fc7703",
    //light: "#F5EBFF",
    // dark: will be calculated from palette.secondary.main,
    contrastText: "#f9f9f9"
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
