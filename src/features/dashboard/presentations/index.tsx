import { Title } from "@/components/title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTextMaxCaracters } from "@/helpers/formatTextMaxCaracters";
import { withLayout } from "@/HOC/withLayout";
import { CheckCheck, MessageSquareMore } from "lucide-react";
import CountUp from "react-countup";

const Dashboard = () => {
  return (
    <div>
      <Title title="Dashboard" />

      <div className="grid grid-cols-2 gap-2">
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
      </div>
      <div>
        <h4 className="text-xl font-semibold mt-10">Últimas mensagens</h4>
        <div>
          {/* Messages */}
          <div className="flex gap-4 mt-10 flex-col">
            <div className=" flex flex-col md:flex-row w-full items-start md:items-center justify-between border-2 p-4 rounded-lg border-success relative">
              <Badge className="bg-success text-white absolute -top-4 left-4">
                Última mensagem recebida
              </Badge>
              <CheckCheck className="h-5 w-5 text-success mr-5" />

              <div className="flex flex-col min-w-fit ">
                <strong>Michael Scott</strong>
                <span>14:30</span>
              </div>
              <div className="flex  w-full my-10 md:mx-10 md:my-0">
                <MessageSquareMore className="h-5 w-5 mr-2" />

                <p
                  className=" text-sm font-normal"
                  onClick={() => {
                    console.log("Open message");
                  }}
                >
                  {formatTextMaxCaracters(
                    "Gostei muito do seu trabalho, parabéns!",
                    180
                  )}
                </p>
              </div>
              <span className="text-success text-2xl  font-semibold min-w-fit  ">
                R$ 100,00
              </span>
            </div>
            <div className=" flex flex-col md:flex-row w-full items-start md:items-center justify-between border-2 p-4 rounded-lg relative">
              <CheckCheck className="h-5 w-5 text-success mr-5" />

              <div className="flex flex-col min-w-fit ">
                <strong>Michael Scott</strong>
                <span>14:30</span>
              </div>
              <div className="flex  w-full my-10 md:mx-10 md:my-0">
                <MessageSquareMore className="h-5 w-5 mr-2" />

                <p
                  className=" text-sm font-normal"
                  onClick={() => {
                    console.log("Open message");
                  }}
                >
                  {formatTextMaxCaracters(
                    "Gostei muito do seu trabalho, parabéns!",
                    180
                  )}
                </p>
              </div>
              <span className="text-success text-2xl  font-semibold min-w-fit  ">
                R$ 10,00
              </span>
            </div>
            <div className=" flex flex-col md:flex-row w-full items-start md:items-center justify-between border-2 p-4 rounded-lg relative">
              <CheckCheck className="h-5 w-5 text-success mr-5" />

              <div className="flex flex-col min-w-fit ">
                <strong>Michael Scott</strong>
                <span>14:30</span>
              </div>
              <div className="flex  w-full my-10 md:mx-10 md:my-0">
                <MessageSquareMore className="h-5 w-5 mr-2" />

                <p
                  className=" text-sm font-normal"
                  onClick={() => {
                    console.log("Open message");
                  }}
                >
                  {formatTextMaxCaracters(
                    "Gostei muito do seu trabalho, parabéns!",
                    180
                  )}
                </p>
              </div>
              <span className="text-success text-2xl  font-semibold min-w-fit  ">
                R$ 10,00
              </span>
            </div>
            <div className=" flex flex-col md:flex-row w-full items-start md:items-center justify-between border-2 p-4 rounded-lg relative">
              <CheckCheck className="h-5 w-5 text-success mr-5" />
              <div className="flex flex-col min-w-fit ">
                <strong>Michael Scott</strong>
                <span>14:30</span>
              </div>
              <div className="flex  w-full my-10 md:mx-10 md:my-0">
                <MessageSquareMore className="h-5 w-5 mr-2" />

                <p
                  className=" text-sm font-normal"
                  onClick={() => {
                    console.log("Open message");
                  }}
                >
                  {formatTextMaxCaracters(
                    "Gostei muito do seu trabalho, parabéns!",
                    180
                  )}
                </p>
              </div>
              <span className="text-success text-2xl  font-semibold min-w-fit  ">
                R$ 10,00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = withLayout(Dashboard);

export default DashboardPage;
