import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/UserContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { NotificationProvider } from "./context/NotificationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <ThemeProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </NotificationProvider>
  </StrictMode>,
);
