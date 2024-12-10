import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ThemeTypeModeProvider from "./providers/ThemeTypeModeProvider";
import Pages from "./pages";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeTypeModeProvider>
      <Pages />
    </ThemeTypeModeProvider>
  </BrowserRouter>
);
