import { createTheme } from "@mui/material/styles";
// import { red } from "@mui/material/colors";
import useThemeTypeMode from "@/hooks/useThemeTypeMode";

function useThemeLayout() {

  const {modeDark} = useThemeTypeMode()

  const theme = createTheme({
    cssVariables: true,
    components:{
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            borderWidth: 0,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            "&:hover": {
              
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            boxShadow:
              "7px 6px 8px 1px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 3px 3px 3px 0px rgb(0 0 0 / 12%)",
          },
        },
      }
    },
    palette: {
      mode: modeDark ? 'dark' : 'light'
    },    
    typography: {
      fontSize: 14,
      caption: {
        fontSize: 12,
      },
      body1: {
        fontSize: 14,
      },
      h5: {
        fontWeight: "bold",
      },
      fontFamily: [
        'Poppins',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

  return { theme };
}

export default useThemeLayout;
