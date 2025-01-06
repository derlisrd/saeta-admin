import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PublicPages from "./public";
import AutenticatedPages from "./auth";
import useThemeLayout from "@/hooks/useThemeLayout";
import { useAuth } from "@/providers/AuthProvider";

function Pages() {
  const { theme } = useThemeLayout();
  const { isAuth } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isAuth ? <PublicPages /> : <AutenticatedPages />}
    </ThemeProvider>
  );
}

export default Pages;
