import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PublicPages from "./public";
import AutenticatedPages from "./auth";
import { useAuth } from "@/providers/AuthProvider";
import useThemeCustom from "@/hooks/useThemeCustom";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Pages() {
  const { customTheme } = useThemeCustom();
  const { isAuth, cerrarSesion } = useAuth();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        console.log(error, query.queryKey);
        cerrarSesion();
      },
    }),
  });
  return (
    <ThemeProvider theme={customTheme ?? {}}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>{!isAuth ? <PublicPages /> : <AutenticatedPages />}</QueryClientProvider>
    </ThemeProvider>
  );
}

export default Pages;
