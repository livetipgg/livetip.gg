import { RouterProvider } from "react-router-dom";
import { routers } from "./routers";
import { RecoilRoot } from "recoil";
import { Toaster } from "./components/ui/sonner";
import WebSocketProvider from "./config/WebSocketProvider";
function App() {
  return (
    <WebSocketProvider>
      <RecoilRoot>
        <RouterProvider router={routers} />
        <Toaster />
      </RecoilRoot>
    </WebSocketProvider>
  );
}

export default App;
