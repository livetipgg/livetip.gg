import { RouterProvider } from "react-router-dom";
import { routers } from "./routers";
import { RecoilRoot } from "recoil";
import { Toaster } from "./components/ui/sonner";
function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={routers} />
      <Toaster />
    </RecoilRoot>
  );
}

export default App;
