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
import socket from "@/socket";
import { useEffect, useState } from "react";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { authController, authState } from "@/features/auth/states/atoms";
import notificationAudio from "@/assets/notification-sound.wav";
const Dashboard = () => {
  const { controller: balanceStateController } = useRecoilValue(balanceState);
  const { isLoading: balanceIsLoading } = balanceStateController;
  const { user } = useRecoilValue(authState);
  const { isAuthenticated } = useRecoilValue(authController);
  console.log("isAuthenticated", isAuthenticated);
  const { controller: messageStateController } = useRecoilValue(messageState);
  const { isLoadingTotals: totalsMessageIsLoading } = messageStateController;
  const [processedMessages, setProcessedMessages] = useState(new Set());

  const { loadDashboardArea } = useLoadDashboardAreaUseCase();
  const { successSonner } = useCustomSonner();

  const audio = new Audio(notificationAudio);

  useEffect(() => {
    if (isAuthenticated) {
      prepareSound();

      socket.connect();

      socket.on("connect", () => {
        socket.emit(
          "join_room",
          {
            room: `private-${user.id}`,
            token: user.token,
          },
          () => {}
        );
      });
      socket.on("message", (response) => {
        const message = JSON.parse(response);
        console.log("is authenticated loaddashborard area");
        loadDashboardArea();

        if (message && message.sender && !processedMessages.has(message.id)) {
          setProcessedMessages((prev) => new Set(prev).add(message.id));
          audio.play().catch((error) => {
            console.error("Erro ao reproduzir som:", error);
          });

          return successSonner(`🎉 Nova mensagem recebida`);
        }
      });
      return () => {
        processedMessages.clear();
      };
    }
  }, []);

  const prepareSound = () => {
    // Carrega o som
    audio.load();

    audio.volume = 0.1;
  };

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
