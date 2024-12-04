import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PublicPages from "./public";
import AutenticatedPages from "./auth";
import useThemeLayout from "@/hooks/useThemeLayout";
import useAuthStore from "@/store/authStore";

function App() {
  const { theme } = useThemeLayout();
  const { isAuth } = useAuthStore();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAuth ? <AutenticatedPages /> : <PublicPages />}
    </ThemeProvider>
  );
}

export default App;
