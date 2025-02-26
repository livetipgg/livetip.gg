import { ButtonNewLive } from "@/components/button-new-live";
import { withLayout } from "@/HOC/withLayout";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useRecoilValue } from "recoil";
import { balanceState } from "@/features/balance/states/atoms";
import { messageState } from "@/features/messages/states/atoms";
import { LastMessagesViewList } from "@/features/messages/presentations/components/lastMessagesView";
import AnalyticsCardGrid from "./components/analytics-card-grid";
import { useLoadDashboardAreaUseCase } from "../useCases/useLoadDashboardAreaUseCase";
import { useEffect } from "react";
import { authState } from "@/features/auth/states/atoms";
import notificationAudio from "@/assets/notification-sound.wav";
import { useLoadLastMessagesUseCase } from "@/features/messages/useCases/useLoadLastMessagesUseCase";
import { useWebSocket } from "@/config/WebSocketProvider";
import { emitEvent } from "@/socket";
import { useIsMobile } from "@/hooks/use-mobile";
const Dashboard = () => {
  const { controller: balanceStateController } = useRecoilValue(balanceState);
  const { isLoading: balanceIsLoading } = balanceStateController;
  const { user } = useRecoilValue(authState);
  const { controller: messageStateController } = useRecoilValue(messageState);
  const { isLoadingTotals: totalsMessageIsLoading } = messageStateController;

  const { loadDashboardArea } = useLoadDashboardAreaUseCase();
  const { loadLastMessages } = useLoadLastMessagesUseCase();
  const isMobile = useIsMobile();

  const audio = new Audio(notificationAudio);
  const socket = useWebSocket();

  useEffect(() => {
    if (user.token) {
      prepareSound();

      socket.connect();

      emitEvent("join_room", {
        room: `private-${user.id}`,
        token: user.token,
      });
      socket.on("connect", () => {});

      socket.on("message", () => {
        loadDashboardArea();
        loadLastMessages();
      });
      return () => {
        socket.disconnect();
        socket.off("message");
      };
    }
  }, []);

  const prepareSound = () => {
    audio.load();

    audio.volume = 0.1;
  };

  useEffect(() => {
    loadDashboardArea();
    loadLastMessages();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between mb-4 ">
        <h4 className="text-xl font-semibold ">Dashboard</h4>
        <div className="flex items-center gap-2  flex-1 justify-end">
          <ButtonNewLive />
          <Button
            size={isMobile ? "icon" : "default"}
            variant={"outline"}
            className={` ${
              balanceIsLoading || totalsMessageIsLoading
                ? "text-muted-foreground"
                : ""
            }`}
            title="Atualizar"
            onClick={() => {
              loadDashboardArea();
            }}
            disabled={balanceIsLoading || totalsMessageIsLoading}
          >
            {isMobile ? "" : <span className="mr-2">Atualizar</span>}
            <RefreshCw
              className={`w-4 h-4 mb-0 ${
                balanceIsLoading || totalsMessageIsLoading ? "animate-spin" : ""
              }`}
            />
          </Button>
        </div>
      </div>

      <AnalyticsCardGrid />

      <LastMessagesViewList />
    </>
  );
};

const DashboardPage = withLayout(Dashboard, "LiveTip - Dashboard");

export default DashboardPage;
