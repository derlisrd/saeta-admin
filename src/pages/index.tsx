import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PublicPages from "./public";
import AutenticatedPages from "./auth";
import useThemeLayout from "@/hooks/useThemeLayout";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Pages() {
  const { theme } = useThemeLayout();
  const { isAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAuth ? <AutenticatedPages /> : <PublicPages />}
    </ThemeProvider>
  );
}

export default Pages;
