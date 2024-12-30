import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PublicPages from "./public";
import AutenticatedPages from "./auth";
import useThemeLayout from "@/hooks/useThemeLayout";
import useAuthStore from "@/store/authStore";

function Pages() {
  const { theme } = useThemeLayout();
  const { isAuth } = useAuthStore();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isAuth ? <PublicPages /> : <AutenticatedPages />}
    </ThemeProvider>
  );
}

export default Pages;
