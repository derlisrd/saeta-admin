import App from "./app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./providers/AuthProvider";
import ThemeCustomProvider from "./providers/ThemeCustomProvider";
import { BrowserRouter } from "react-router-dom";
import { LayoutProvider } from "./providers/LayoutProvider";

function Root() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/admin">
        <ThemeCustomProvider>
          <AuthProvider>
            <LayoutProvider>
              <App />
            </LayoutProvider>
          </AuthProvider>
        </ThemeCustomProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default Root;
