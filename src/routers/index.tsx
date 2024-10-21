import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import DashboardPage from "@/features/dashboard/presentations";
import LoginPage from "@/features/auth/implementation/login";
import MessagesReceivedPage from "@/features/messages/presentations";
import WithdrawPage from "@/features/carteira/presentations/withdraw";
import { withAuth } from "@/HOC/withAuth";
import ProfilePage from "@/features/profile/presentations";
import TransmissionPage from "@/features/transmission/presentations";
import { TransactionsHistoryPage } from "@/features/carteira/presentations/history";
import UserMessagePage from "@/features/carteira/presentations/donate";

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
        path: routes["Profile"].path,
        Component: withAuth(ProfilePage),
      },
      {
        path: routes["UserMessage"].path,
        Component: UserMessagePage,
      },
      {
        path: routes["Transmission"].path,
        Component: TransmissionPage,
      },
      {
        path: routes["TransactionsHistory"].path,
        Component: withAuth(TransactionsHistoryPage),
      },

      {
        path: "*",
        Component: withAuth(DashboardPage),
      },
    ],
  },
]);
