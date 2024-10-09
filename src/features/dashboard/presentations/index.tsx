import { ButtonNewLive } from "@/components/button-new-live";
import { SectionTitle } from "@/components/section-title";
import { withLayout } from "@/HOC/withLayout";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useRecoilValue } from "recoil";
import { balanceState } from "@/features/balance/states/atoms";
import { messageState } from "@/features/messages/states/atoms";
import { LastMessagesViewList } from "@/features/messages/presentations/components/lastMessagesView";
import AnalyticsCardGrid from "./components/analytics-card-grid";
import { useLoadDashboardAreaUseCase } from "../useCases/useLoadDashboardAreaUseCase";

const Dashboard = () => {
  const { controller: balanceStateController } = useRecoilValue(balanceState);
  const { isLoading: balanceIsLoading } = balanceStateController;

  const { controller: messageStateController } = useRecoilValue(messageState);
  const { isLoadingTotals: totalsMessageIsLoading } = messageStateController;

  const { loadDashboardArea } = useLoadDashboardAreaUseCase();

  return (
    <>
      <SectionTitle
        title="Dashboard"
        actions={[
          <ButtonNewLive />,
          <Button
            variant={"outline"}
            className={`${
              balanceIsLoading || totalsMessageIsLoading
                ? "text-muted-foreground"
                : ""
            }`}
            title="Atualizar"
            onClick={loadDashboardArea}
            disabled={balanceIsLoading || totalsMessageIsLoading}
          >
            <span className="mr-2">Atualizar</span>
            <RefreshCw
              className={`w-4 h-4 mb-0 ${
                balanceIsLoading || totalsMessageIsLoading ? "animate-spin" : ""
              }`}
            />
          </Button>,
        ]}
      />
      <AnalyticsCardGrid />
      <LastMessagesViewList />
    </>
  );
};

const DashboardPage = withLayout(Dashboard, "LiveChat - Dashboard");

export default DashboardPage;
