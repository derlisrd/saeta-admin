import { createRoot } from "react-dom/client";
import App from "./pages";
import { BrowserRouter } from "react-router-dom";
import ThemeTypeModeProvider from "./providers/ThemeTypeModeProvider";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeTypeModeProvider>
      <App />
    </ThemeTypeModeProvider>
  </BrowserRouter>
);
