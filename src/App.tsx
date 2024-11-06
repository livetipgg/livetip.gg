import { RouterProvider } from "react-router-dom";
import { routers } from "./routers";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <RouterProvider router={routers} />
      <Toaster />
    </>
  );
}

export default App;
