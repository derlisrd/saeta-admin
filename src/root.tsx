import App from "./app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./providers/AuthProvider";
import ThemeCustomProvider from "./providers/ThemeCustomProvider";
import { BrowserRouter } from "react-router-dom";

function Root() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeCustomProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeCustomProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default Root;
