import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import DashboardPage from "@/features/dashboard/presentations";
import LoginPage from "@/features/auth/implementation/login";
import MessagesReceivedPage from "@/features/messages/presentations";
import UserMessagePage from "@/features/userMessage/presentations";
import WithdrawPage from "@/features/carteira/presentations/withdraw";
import { withAuth } from "@/HOC/withAuth";

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
        Component: withAuth(DashboardPage),
      },
      {
        path: routes["MessagesReceived"].path,
        Component: withAuth(MessagesReceivedPage),
      },
      {
        path: routes["Withdraw"].path,
        Component: withAuth(WithdrawPage),
      },
      {
        path: routes["UserMessage"].path,
        Component: UserMessagePage,
      },
      // {
      //   path: routes["Register"].path,
      //   Component: RegisterPage,
      // },

      {
        path: "*",
        Component: withAuth(DashboardPage),
      },
    ],
  },
]);
