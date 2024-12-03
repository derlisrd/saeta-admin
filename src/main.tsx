// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages";
import AuthProvider from "@/providers/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import ThemeTypeModeProvider from "./providers/ThemeTypeModeProvider";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <ThemeTypeModeProvider>
        <App />
      </ThemeTypeModeProvider>
    </BrowserRouter>
  </AuthProvider>
);
