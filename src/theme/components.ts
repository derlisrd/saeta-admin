import { Components, CssVarsTheme, Theme } from "@mui/material";

export const components = {
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
          fontSize:9
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
          borderRadius: "12px",
          borderWidth: 0,
          fontSize: 13
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
      defaultProps:{
        variant:'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: "12px",
          "&:hover": {
          },
        },
      },
    },
    MuiTableCell:{
      styleOverrides:{
        root:{
          fontSize:12,
          padding:4,
        }
      }
    },
    MuiDialogActions:{
      styleOverrides:{
        paper:{
          padding:8
        }
      }
    },

    MuiDialog:{
      defaultProps:{
        fullWidth:true
      },
      styleOverrides:{
        paper:{
          borderRadius:"12px"
        }
      }
    }
    
  } as Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>