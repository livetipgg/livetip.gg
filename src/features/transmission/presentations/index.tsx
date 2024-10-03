import { SectionTitle } from "@/components/section-title";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { setDocumentTitle } from "@/helpers/setDocumentTitle";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { Check, Copy } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TransmissionPage = () => {
  const { successSonner } = useCustomSonner();
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const today = new Date();

  // format dd de setembro de yyyy
  const date = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);

  useEffect(() => {
    setDocumentTitle(`Transmissão - ${date}`);
  }, [date]);

  useEffect(() => {
    setTheme("light");
  }, []);
  return (
    <div className="max-w-4xl h-screen m-auto p-10">
      <SectionTitle title={`Transmissão - ${date}`} />
      <div className="max-w-fit mb-8">
        <h4 className="text-sm font-semibold">Link de doação</h4>
        <div className="border rounded flex items-center ">
          <Button
            variant="link"
            onClick={() => {
              navigate(`/donate/${id}`);
            }}
          >
            https://www.livechat.com/donate/{id}
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://www.livechat.com/donate/${id}`
              );

              successSonner("Link copiado com sucesso!");
            }}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copiar
          </Button>
        </div>
      </div>
      <div className="space-y-5 pb-10">
        <strong>Mensagens da transmissão (25)</strong>
        {/* <NoContent /> */}
        {/* Mensagem */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex">
              <div className="bg-success p-2 rounded-s-lg">
                <span className="text-white font-semibold">R$ 100,00</span>
              </div>
              <div className="p-2 bg-primary rounded-e-lg">
                <span className="font-semibold text-white">nome usuario</span>
              </div>
            </div>
            <Button variant="outline" size={"icon"}>
              <Check className="w-4 h-4" />
            </Button>
          </div>
          <div className="rounded-lg border border-primary mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-300 mt-2">
            <p className="p-2 flex gap-2 items-center">
              {/* Horário */}
              <span className="text-muted-foreground text-sm">10:00</span>
              Adorei a transmissão, muito bom, parabéns pelo trabalho.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransmissionPage;
