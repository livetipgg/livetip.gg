/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import pixLogo from "@/assets/pix-logo.png";
import bitcoinLogo from "@/assets/bitcoin-logo.png";
import { Inbox } from "lucide-react";
import AnalyticsCard from "./analytics-card";
import { messageState } from "@/features/messages/states/atoms";
import { useRecoilValue } from "recoil";
import { balanceState } from "@/features/balance/states/atoms";
import { useLoadTotalsMessageUseCase } from "@/features/messages/useCases/useLoadTotalsMessageUseCase";

const AnalyticsCardGrid = () => {
  const { controller: balanceStateController } = useRecoilValue(balanceState);
  const { isLoading: balanceIsLoading, error: errorBalance } =
    balanceStateController;

  const { controller: messageStateController, totals } =
    useRecoilValue(messageState);
  const { isLoadingTotals: totalsMessageIsLoading, errorTotals } =
    messageStateController;

  const { loadTotalsMessage } = useLoadTotalsMessageUseCase();

  useEffect(() => {
    loadTotalsMessage({
      startDate: "2002-10-02",
      endDate: "2024-10-10",
    });
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <AnalyticsCard
        error={errorTotals}
        isLoading={totalsMessageIsLoading}
        borderColor="hsl(var(--primary))"
        endValue={totals.total}
        icon={<Inbox className="w-5 h-5 text-primary" />}
        subtitle="Mensagens recebidas nos últimos 30 dias"
        textColor="text-primary"
        title="Mensagens Recebidas"
      />
      <AnalyticsCard
        error={errorBalance}
        isLoading={balanceIsLoading}
        borderColor="hsl(var(--success))"
        endValue={1000}
        icon={<img src={pixLogo} alt="pix" className="w-5 h-5" />}
        subtitle="Valor recebido nos últimos 30 dias"
        textColor="text-success"
        title="PIX Recebido"
        prefix="R$ "
        decimals={2}
      />
      <AnalyticsCard
        error={errorBalance}
        isLoading={balanceIsLoading}
        borderColor="hsl(var(--warning))"
        endValue={0.0005}
        icon={<img src={bitcoinLogo} alt="bitcoin" className="w-5 h-5" />}
        subtitle="Valor recebido nos últimos 30 dias"
        textColor="text-warning"
        title="Satoshi Recebido"
        decimals={6}
        convertToCurrency
      />
    </div>
  );
};

export default AnalyticsCardGrid;
