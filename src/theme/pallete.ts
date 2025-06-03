import { PaletteOptions } from "@mui/material";

export const pallete = {
  mode: "dark",
  primary: {
    main: "#00a76f",
    // light: will be calculated from palette.primary.main,
    // dark: will be calculated from palette.primary.main,
    // contrastText: will be calculated to contrast with palette.primary.main,
    contrastText: "#fff"
  },
  secondary: {
    main: "#74ccae",
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
