import { RouterProvider } from "react-router-dom";
import { routers } from "./routers";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";
import ReactGA from "react-ga4";

export const TRACKING_ID = "GTM-KJ7V6D8J";
function App() {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, []);

  return (
    <>
      <RouterProvider router={routers} />
      <Toaster />
    </>
  );
}

export default App;
