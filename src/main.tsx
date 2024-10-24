import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import WebSocketProvider from "./config/WebSocketProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <WebSocketProvider>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </WebSocketProvider>
);
