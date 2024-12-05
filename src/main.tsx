import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import WebSocketProvider from "./config/WebSocketProvider.tsx";
import { RecoilRoot } from "recoil";
import "intro.js/introjs.css";
import React from "react";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <WebSocketProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </WebSocketProvider>
    </RecoilRoot>
  </React.StrictMode>
);
