import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ThemeTypeModeProvider from "./providers/ThemeTypeModeProvider";
import Pages from "./pages";
import { AuthProvider } from "./providers/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeTypeModeProvider>
      <AuthProvider>
        <Pages />
      </AuthProvider>
    </ThemeTypeModeProvider>
  </BrowserRouter>
);
