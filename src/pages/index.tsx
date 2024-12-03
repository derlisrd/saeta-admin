import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import PublicPages from "./public";
import AutenticatedPages from "./auth";
import useThemeLayout from "@/hooks/useThemeLayout";

function App() {
  const { isAuth } = useAuth();
  const { theme } = useThemeLayout();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAuth ? <AutenticatedPages /> : <PublicPages />}
    </ThemeProvider>
  );
}

export default App;
