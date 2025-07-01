import App from "./app";
import { config } from "./constants/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./providers/AuthProvider";
import ThemeCustomProvider from "./providers/ThemeCustomProvider";
import { BrowserRouter } from "react-router-dom";
import { LayoutProvider } from "./providers/LayoutProvider";
import { ConfigProvider } from "./providers/ConfigProvider";
import { NotificationManager } from "./providers/NotificationManagerProvider";

function Root() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {

      },
      mutations: {

      },
    },
  });
  return (
    <NotificationManager>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={config.BASE_PATH}>
          <ThemeCustomProvider>
            <ConfigProvider>
              <AuthProvider>
                <LayoutProvider>
                  <App />
                </LayoutProvider>
              </AuthProvider>
            </ConfigProvider>
          </ThemeCustomProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </NotificationManager>
  );
}

export default Root;
