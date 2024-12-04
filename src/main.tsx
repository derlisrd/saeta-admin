import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages";
import { BrowserRouter } from "react-router-dom";
import ThemeTypeModeProvider from "./providers/ThemeTypeModeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeTypeModeProvider>
        <App />
      </ThemeTypeModeProvider>
    </BrowserRouter>
  </StrictMode>
);
