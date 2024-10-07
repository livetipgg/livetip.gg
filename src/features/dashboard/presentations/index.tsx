import { ButtonNewLive } from "@/components/button-new-live";
import { NoContent } from "@/components/no-content";
import { SectionTitle } from "@/components/section-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authState } from "@/features/auth/states/atoms";
import { withLayout } from "@/HOC/withLayout";
import CountUp from "react-countup";
import { useRecoilValue } from "recoil";

const Dashboard = () => {
  const { user } = useRecoilValue(authState);
  console.log("auth", user);
  return (
    <div>
      <SectionTitle title="Dashboard" actions={<ButtonNewLive />} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Card
          style={{
            borderBottom: "4px solid hsl(var(--primary))",
          }}
        >
          <CardHeader>
            <CardTitle>Mensagens</CardTitle>
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
        <Card style={{ borderBottom: "4px solid hsl(var(--success))" }}>
          <CardHeader>
            <CardTitle>Valor Recebido</CardTitle>
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
            <CardTitle>Valor Recebido</CardTitle>
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
