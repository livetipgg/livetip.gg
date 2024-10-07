import { ButtonNewLive } from "@/components/button-new-live";
import { NoContent } from "@/components/no-content";
import { SectionTitle } from "@/components/section-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withLayout } from "@/HOC/withLayout";
import CountUp from "react-countup";
import pixLogo from "@/assets/pix-logo.png";
import bitcoinLogo from "@/assets/bitcoin-logo.png";
import { Button } from "@/components/ui/button";
import { MessageSquare, RefreshCw } from "lucide-react";
import { useGetUserBalancesUseCase } from "@/features/balance/useCases/useGetUserBalancesUseCase";
import { useRecoilValue } from "recoil";
import { balanceState } from "@/features/balance/states/atoms";
const Dashboard = () => {
  const { loadUserBalance } = useGetUserBalancesUseCase();
  const { controller } = useRecoilValue(balanceState);
  const { isLoading } = controller;
  return (
    <div>
      <SectionTitle
        title="Dashboard"
        actions={[
          <ButtonNewLive />,
          <Button
            variant={"outline"}
            size={"icon"}
            title="Atualizar"
            onClick={loadUserBalance}
            disabled={isLoading}
          >
            <RefreshCw
              className={`w-4 h-4 mb-0 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>,
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Card
          style={{
            borderBottom: "4px solid hsl(var(--primary))",
          }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare
                className="w-5 h-5 text-primary"
                fill=" hsl(var(--primary))"
              />
              Mensagens Recebidas
            </CardTitle>
            <span className="text-muted-foreground">
              Mensagens recebidas nos últimos 30 dias
            </span>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-semibold text-primary">
              <CountUp start={0} end={10} duration={2} />
            </span>
          </CardContent>
        </Card>
        {/* Valor recebido por pix */}
        <Card style={{ borderBottom: "4px solid hsl(var(--success))" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <img src={pixLogo} alt="pix" className="w-5 h-5" />
              PIX Recebido
            </CardTitle>
            <span className="text-muted-foreground">
              Valor recebido nos últimos 30 dias
            </span>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-semibold text-success">
              <CountUp
                start={0}
                end={1000}
                duration={2}
                decimals={2}
                prefix="R$ "
                separator="."
                decimal=","
              />
            </span>
          </CardContent>
        </Card>
        <Card style={{ borderBottom: "4px solid hsl(var(--warning))" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <img src={bitcoinLogo} alt="bitcoin" className="w-5 h-5" />
              Bitcoin Recebido
            </CardTitle>
            <span className="text-muted-foreground">
              Valor recebido nos últimos 30 dias
            </span>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-semibold text-warning">
              {/* exemplo do valor 0,000000 */}
              <CountUp
                start={0}
                end={0.0005}
                duration={2}
                decimals={6}
                prefix=""
                separator="."
                decimal=","
              />
            </span>
          </CardContent>
        </Card>
      </div>
      <div>
        <h4 className="text-xl font-semibold mt-10">Últimas mensagens</h4>
        <NoContent message="Nenhuma mensagem para mostrar" />
      </div>
    </div>
  );
};

const DashboardPage = withLayout(Dashboard, "LiveChat - Dashboard");

export default DashboardPage;
