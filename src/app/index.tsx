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
  const { isAuth } = useAuth();

  return (
    <ThemeProvider theme={customTheme ?? {}}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>{!isAuth ? <PublicPages /> : <AutenticatedPages />}</QueryClientProvider>
    </ThemeProvider>
  );
}

export default Pages;
