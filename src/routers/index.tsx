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
import AdminPage from "@/features/admin/presentations";
import RegisterPage from "@/features/auth/implementation/register";
import UsersManagementPage from "@/features/admin/presentations/users-management";
import { NotFoundPage } from "@/features/not-found-page";
import { TransmissionExpandedPage } from "@/features/transmission/presentations/expanded";

export const routers = createBrowserRouter([
  {
    path: routes["Login"].path,
    children: [
      {
        index: true,
        Component: LoginPage,
      },
      {
        path: routes["Register"].path,
        Component: RegisterPage,
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
        path: routes["Transmission"].path,
        Component: withAuth(TransmissionPage),
      },
      {
        path: routes["TransmissionExpanded"].path,
        Component: withAuth(TransmissionExpandedPage),
      },
      {
        path: routes["Admin"].path,
        Component: AdminPage,
      },
      {
        path: routes["TransactionsHistory"].path,
        Component: withAuth(TransactionsHistoryPage),
      },
      {
        path: routes["UsersManagement"].path,
        Component: UsersManagementPage,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
