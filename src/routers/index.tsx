import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import DashboardPage from "@/features/dashboard/presentations";
import LoginPage from "@/features/auth/implementation/login";
import MessagesReceivedPage from "@/features/messages/presentations";
import UserMessagePage from "@/features/userMessage/presentations";

export const routers = createBrowserRouter([
  {
    path: routes["Login"].path,
    children: [
      {
        index: true,
        Component: LoginPage,
      },
      {
        path: routes["Dashboard"].path,
        Component: DashboardPage,
      },
      {
        path: routes["MessagesReceived"].path,
        Component: MessagesReceivedPage,
      },
      {
        path: routes["UserMessage"].path,
        Component: UserMessagePage,
      },
      // {
      //   path: routes["Register"].path,
      //   Component: RegisterPage,
      // },

      // {
      //   path: "*",
      //   Component: withAuth(DashboardPage),
      // },
    ],
  },
]);
