import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PublicPages from "./public";
import AutenticatedPages from "./auth";
import { useAuth } from "@/providers/AuthProvider";
import useThemeCustom from "@/hooks/useThemeCustom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Pages() {
  const { customTheme } = useThemeCustom();
  const { isAuth, cerrarSesion } = useAuth();

  queryClient.setQueryDefaults(["default"], {
    queryFn: async ({ queryKey }) => {
      try {
        const response = await fetch(queryKey[0] as string);
        if (response.status === 401) {
          cerrarSesion(); // Cierra la sesión si la API responde con 401
        }
        return response.json();
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <ThemeProvider theme={customTheme ?? {}}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>{!isAuth ? <PublicPages /> : <AutenticatedPages />}</QueryClientProvider>
    </ThemeProvider>
  );
}

export default Pages;
