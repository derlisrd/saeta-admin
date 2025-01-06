import { createTheme } from "@mui/material/styles";
import useThemeTypeMode from "@/hooks/useThemeTypeMode";

function useThemeLayout() {

  const {modeDark} = useThemeTypeMode()

  const theme = createTheme({
    palette: {
      mode: modeDark ? 'dark' : 'light',
      primary: {
        main: '#3ecf8e',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#E0C2FF',
        light: '#F5EBFF',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#47008F',
      },
    }, 
    components:{
      MuiCssBaseline:{
        styleOverrides:{
          "::-webkit-scrollbar": {width: 0}
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            boxShadow:
              "7px 6px 8px 1px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 3px 3px 3px 0px rgb(0 0 0 / 12%)",
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
             minWidth: "30px",
            /*"& span": {
              //fontSize:tema.fontSize.menu
            }, */
          },
        },
      },
      MuiFormHelperText:{
        styleOverrides:{
          root:{
            fontSize:10
          }
        }
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            alignItems: 'center',
            borderRadius: "0 18px 18px 0",
            transition: "all 0.02s linear",
            "&.Mui-selected": {
              borderLeft: `4px solid `,
            },
            "&:hover": {
              /* backgroundColor: colores[tema.colors].primary.light,
              "& span": {
                color:
                  tema.mode === "light"
                    ? colores[tema.colors].primary.main
                    : colorText,
                 fontWeight:"bold", 
              }, */
              borderRadius: "0 18px 18px 0",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            borderWidth: 0,
            fontSize: 13,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: 13,
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
      }
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
