import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PublicPages from "./public";
import AutenticatedPages from "./auth";
import { useAuth } from "@/providers/AuthProvider";
import useThemeCustom from "@/hooks/useThemeCustom";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

function AppPages() {
  const { customTheme } = useThemeCustom();
  const { isAuth, cerrarSesion } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      console.log(event.query);
    });
    return () => {
      unsubscribe();
    };
  }, [queryClient, cerrarSesion]);

  return (
    <ThemeProvider theme={customTheme ?? {}}>
      <CssBaseline />
      {!isAuth ? <PublicPages /> : <AutenticatedPages />}
    </ThemeProvider>
  );
}

export default AppPages;
