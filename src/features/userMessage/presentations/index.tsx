/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Circle, CircleCheck } from "lucide-react";
import pixLogo from "@/assets/pix-logo.png";
import bitcoinLogo from "@/assets/bitcoin-logo.png";
import qrcode from "@/assets/qrcode.png";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { formatTextMaxCaracters } from "@/helpers/formatTextMaxCaracters";
import { useTheme } from "@/components/theme-provider";
const UserMessagePage = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  const [message, setMessage] = useState("");
  const MAX_LENGTH = 300;

  const [dialogPaymentMethodsOpen, setDialogPaymentMethodsOpen] =
    useState(false);

  const [pixDialogPaymentMethodOpen, setDialogPixPaymentMethodOpen] =
    useState(false);

  const { successSonner } = useCustomSonner();
  const handleInputChange = (e: any) => {
    const textarea = e.target;
    setMessage(textarea.value);
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      name: "Pix",
      description: "Pagamento por QR Code",
      selected: true,
      icon: <img src={pixLogo} alt="Pix" className="w-8" />,
    },
    {
      id: 2,
      name: "Bitcoin",
      description: "Pagamento por endereço de carteira",
      selected: false,
      icon: <img src={bitcoinLogo} alt="Bitcoin" className="w-8" />,
    },
  ]);

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-100">
      <div className="bg-white rounded-2xl p-5 max-w-[320px] w-full flex items-center flex-col justify-center relative ">
        {/* Avatar */}
        <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center absolute -top-16 shadow-md p-1">
          <Avatar className="cursor-pointer w-full h-full">
            <AvatarImage src="https://media.licdn.com/dms/image/v2/D4D03AQHgw4V53tPTwA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1720038175164?e=1732752000&v=beta&t=i6rgJ6n5wmUCrhalzCeSRlbpAdUUBijgL2doIG6OUUA" />
            <AvatarFallback>EM</AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-10 flex items-center justify-center flex-col w-full">
          <div className="flex flex-col items-center justify-center mb-4">
            <strong className="text-xl">Michael Scott</strong>
            <span className="text-lg font-semibold text-gray-400">
              Envie uma mensagem
            </span>
          </div>
          {/* Input */}
          <div className="flex flex-col w-full">
            <Label className="mb-2 text-muted-foreground text-xs">
              Seu nome de usuário
            </Label>
            <Input
              placeholder="Digite seu nome de usuário"
              className="rounded-xl"
            />
          </div>
          <div className="flex flex-col w-full mt-2">
            <Label className="mb-2 text-muted-foreground text-xs">
              Mensagem
            </Label>
            <Textarea
              style={{ resize: "none", overflow: "hidden" }} // Desativa o redimensionamento manual e oculta o scroll
              placeholder="Type your message here."
              maxLength={300}
              onChange={handleInputChange}
              className="h-auto rounded-xl max-h-60"
            />
            <span className="text-muted-foreground text-xs text-right mt-2">
              {message.length}/{MAX_LENGTH} caracteres restantes
            </span>
          </div>
          <div className="flex flex-col w-full mt-2">
            <Label className="mb-2 text-muted-foreground text-xs">Valor</Label>
            <NumericFormat
              className="rounded-xl"
              thousandSeparator={true}
              decimalScale={2}
              prefix="R$"
              fixedDecimalScale
              allowNegative={false}
              customInput={Input}
              placeholder="R$ 0,00"
            />
            <span className="text-primary font-semibold text-xs text-right mt-2">
              O valor mínimo é de R$ 1,00{" "}
            </span>
          </div>
          <Dialog
            open={dialogPaymentMethodsOpen}
            onOpenChange={(open) => {
              setDialogPaymentMethodsOpen(open);
            }}
          >
            <DialogTrigger asChild>
              <Button className="mt-4 w-full rounded-xl">CONTINUAR</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Escolha a forma de pagamento:</DialogTitle>
                <DialogDescription>
                  Você pode escolher entre PIX ou Bitcoin
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col w-full mt-2 gap-3">
                {paymentMethods.map((paymentMethod) => (
                  <div
                    onClick={() => {
                      setPaymentMethods((prev) =>
                        prev.map((prevItem) => ({
                          ...prevItem,
                          selected: prevItem.id === paymentMethod.id,
                        }))
                      );
                    }}
                    className={`flex items-center w-full p-2 border-2 justify-between  ${
                      paymentMethod.selected ? "border-success" : "border"
                    } rounded-xl cursor-pointer `}
                  >
                    <div className="flex items-center gap-2">
                      {paymentMethod.selected ? (
                        <CircleCheck size={24} className="text-success" />
                      ) : (
                        <Circle size={24} />
                      )}
                      <div className="flex flex-col ">
                        <strong>{paymentMethod.name}</strong>
                        <span className="text-muted-foreground text-xs">
                          {paymentMethod.description}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {paymentMethod.icon}
                    </div>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <div className=" flex flex-col w-full gap-4">
                  <Button
                    className="mt-4 w-full rounded-xl"
                    onClick={() => {
                      setDialogPaymentMethodsOpen(false);
                      setDialogPixPaymentMethodOpen(true);
                    }}
                  >
                    CONTINUAR
                  </Button>

                  <Button
                    variant={"link"}
                    className="w-full rounded-xl"
                    onClick={() => {
                      setDialogPaymentMethodsOpen(false);
                    }}
                  >
                    CANCELAR E VOLTAR
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog
            open={pixDialogPaymentMethodOpen}
            onOpenChange={(open) => {
              setDialogPixPaymentMethodOpen(open);
            }}
          >
            <DialogTrigger asChild className="hidden"></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <div className="w-full flex justify-center items-center mt-10 flex-col">
                <strong className="text-center">
                  Este código Pix é de uso único e tem validade de 24 horas.
                </strong>
                <img src={qrcode} alt="QR Code" className="w-60 h-60" />
                <Label className="text-center my-4">Pix Copia e Cola</Label>
                <Input
                  type="text"
                  value={formatTextMaxCaracters(
                    "00020101021126580014br.gov.bcb.pix01362fc8fd02-fa45-4ff3-80a4-1c2f3439231b520400005303986540523.235802BR5907LIVEPIX6009SAO PAULO6228052466f47821efed818c9b0b74cc63048197",
                    46
                  )}
                />
                <Button
                  className="mt-4 w-full "
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "00020101021126580014br.gov.bcb.pix01362fc8fd02-fa45-4ff3-80a4-1c2f3439231b520400005303986540523.235802BR5907LIVEPIX6009SAO PAULO6228052466f47821efed818c9b0b74cc63048197"
                    );

                    successSonner("Código copiado com sucesso!");
                  }}
                >
                  COPIAR CÓDIGO
                </Button>
                <span className="flex gap-2 items-center mt-4 text-sm text-muted-foreground">
                  <InfoCircledIcon />
                  Um recibo será exibido após o pagamento.
                </span>
              </div>
              <DialogFooter>
                <Button
                  variant={"link"}
                  className="mt-4 w-full rounded-xl"
                  onClick={() => {
                    setDialogPixPaymentMethodOpen(false);
                  }}
                >
                  VOLTAR
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default UserMessagePage;
