import { RouterProvider } from "react-router-dom";
import { routers } from "./routers";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const TRACKING_ID = "GTM-KJ7V6D8J";
function App() {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, []);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routers} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
