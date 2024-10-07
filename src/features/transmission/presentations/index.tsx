import { SectionTitle } from "@/components/section-title";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { setDocumentTitle } from "@/helpers/setDocumentTitle";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { Copy, MailCheck, MailX } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pixLogo from "@/assets/pix-logo.png";
import bitcoinLogo from "@/assets/bitcoin-logo.png";

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
        <div className="border rounded flex items-center ">
          <Button
            variant="link"
            onClick={() => {
              navigate(`/donate/${id}`, {
                relative: "path",
              });
            }}
          >
            http://localhost:5173/donate/{id}
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              navigator.clipboard.writeText(
                ` http://localhost:5173/donate/${id}`
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
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-success p-2 rounded-s-lg ">
                <span className="text-white font-semibold">R$ 100,00</span>
              </div>
              <div className="p-2 bg-primary rounded-e-lg">
                <span className="font-semibold text-white">nome usuario</span>
              </div>
              <img
                src={pixLogo}
                alt="pix"
                className="w-6 h-6 ml-2 bg-white border p-1 rounded-md  -top-4 "
              />
            </div>
            <Button variant="outline" size={"icon"} title="Marcar como lido">
              <MailCheck className="w-4 h-4" />
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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gray-300 p-2 rounded-s-lg">
                <span className="text-gray-400 font-semibold">R$ 100,00</span>
              </div>
              <div className="p-2 bg-gray-300   rounded-e-lg">
                <span className="font-semibold text-gray-400">
                  nome usuario
                </span>
              </div>
              <img
                src={bitcoinLogo}
                alt="pix"
                className="w-6 h-6 ml-2 bg-white border p-1 rounded-md  -top-4 "
              />
            </div>
            <Button
              variant="outline"
              size={"icon"}
              title="Marcar como não lido"
            >
              <MailX className="w-4 h-4" />
            </Button>
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
          <div className="flex items-center">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
            <img
              src={pixLogo}
              alt="pix"
              className="w-6 h-6 ml-2 bg-white border p-1 rounded-md  -top-4 "
            />
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
          <div className="flex items-center">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
            <img
              src={pixLogo}
              alt="pix"
              className="w-6 h-6 ml-2 bg-white border p-1 rounded-md  -top-4 "
            />
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
          <div className="flex items-center">
            <div className="bg-gray-300 p-2 rounded-s-lg">
              <span className="text-gray-400 font-semibold">R$ 100,00</span>
            </div>
            <div className="p-2 bg-gray-300   rounded-e-lg">
              <span className="font-semibold text-gray-400">nome usuario</span>
            </div>
            <img
              src={pixLogo}
              alt="pix"
              className="w-6 h-6 ml-2 bg-white border p-1 rounded-md  -top-4 "
            />
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
