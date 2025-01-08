import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import ThemeCustomProvider from "./providers/ThemeCustomProvider";
import Pages from "./pages";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeCustomProvider>
      <AuthProvider>
        <Pages />
      </AuthProvider>
    </ThemeCustomProvider>
  </BrowserRouter>
);
