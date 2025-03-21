import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PublicPages from "./public";
import AutenticatedPages from "./auth";
import { useAuth } from "@/providers/AuthProvider";
import useThemeCustom from "@/hooks/useThemeCustom";

function AppPages() {
  const { customTheme } = useThemeCustom();
  const { isAuth } = useAuth();

  return (
    <ThemeProvider theme={customTheme ?? {}}>
      <CssBaseline />
      {!isAuth ? <PublicPages /> : <AutenticatedPages />}
    </ThemeProvider>
  );
}

export default AppPages;
