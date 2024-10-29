/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Circle, CircleCheck, LoaderCircle } from "lucide-react";
import { IPaymentDonateState } from "@/features/carteira/contracts/IRecoilState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { paymentDonateState } from "@/features/carteira/states/atoms";
import { useSendMessageAndCreateQRCode } from "@/features/carteira/useCases/useSendMessageAndCreateQRCode";
import CurrencyInput from "react-currency-input-field";

const MessageStep = () => {
  const setPaymentDonateState = useSetRecoilState(paymentDonateState);
  const { content, controller } = useRecoilValue(paymentDonateState);
  const { loadingCreateQRCode } = controller;
  const { sendMessageAndCreateQRCode } = useSendMessageAndCreateQRCode();
  const MAX_LENGTH = 200;

  const handleInputChange = (e: any) => {
    const textarea = e.target;
    const minHeight = 100; // Defina o valor mínimo desejado aqui

    setPaymentDonateState((prev: IPaymentDonateState) => ({
      ...prev,
      content: {
        ...prev.content,
        content: textarea.value,
      },
    }));

    // Respeita o valor mínimo
    textarea.style.height = "auto";
    textarea.style.height = Math.max(textarea.scrollHeight, minHeight) + "px";
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Label className="mb-1 text-muted-foreground text-xs">
          Seu nome ou apelido
        </Label>
        <Input
          placeholder="Digite seu nome ou apelido"
          className="rounded-xl"
          value={content.sender}
          onChange={(e) => {
            setPaymentDonateState((prev: IPaymentDonateState) => ({
              ...prev,
              content: {
                ...prev.content,
                sender: e.target.value,
              },
            }));
          }}
        />
      </div>
      <div className="flex flex-col w-full mt-2">
        <Label className="mb-1 text-muted-foreground text-xs">Mensagem</Label>
        <Textarea
          style={{ resize: "none", overflow: "hidden" }}
          placeholder="Escreva sua mensagem aqui"
          maxLength={MAX_LENGTH}
          onChange={handleInputChange}
          className="min-h-[100px] rounded-xl "
          value={content.content}
        />
        <span className="text-muted-foreground text-xs text-right mt-2">
          {content.content.length}/{MAX_LENGTH} caracteres restantes
        </span>
      </div>
      <div className="flex flex-col w-full mt-2">
        <Label className="mb-1 text-muted-foreground text-xs">
          Método de pagamento
        </Label>
        <div className="flex flex-col w-full mt-2 gap-3">
          {controller.paymentMethods.map((paymentMethod) => (
            <div
              key={paymentMethod.id}
              onClick={() => {
                setPaymentDonateState((prev: IPaymentDonateState) => ({
                  ...prev,
                  content: {
                    ...prev.content,
                    amount: "",
                    currency: paymentMethod.id,
                  },
                }));
              }}
              className={`flex items-center w-full p-1 border-2 justify-between ${
                paymentMethod.id === content.currency
                  ? "border-success"
                  : "border"
              } rounded-xl cursor-pointer`}
            >
              <div className="flex items-center gap-2">
                {paymentMethod.id === content.currency ? (
                  <CircleCheck size={16} className="text-success" />
                ) : (
                  <Circle size={16} />
                )}
                <div className="flex flex-col ">
                  <strong className="text-sm">{paymentMethod.name}</strong>
                  <span className="text-muted-foreground text-xs">
                    {paymentMethod.description}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  className="h-6 w-6 mr-2"
                  src={paymentMethod.icon}
                  alt="Payment method logo"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full mt-2">
        <div className="flex items-center justify-between">
          <Label className="mb-1 text-muted-foreground text-xs">Valor</Label>

          {content.currency === "BRL" && (
            <span className="text-primary font-semibold text-xs text-right mt-2">
              O valor mínimo é de R$ 1,00
            </span>
          )}
          {content.currency === "BTC" && (
            <span className="text-primary font-semibold text-xs text-right mt-2">
              O valor mínimo é de 300 sats
            </span>
          )}
        </div>

        {content.currency === "BRL" && (
          <CurrencyInput
            className="rounded-xl"
            customInput={Input}
            id="input-example"
            name="input-name"
            placeholder="R$ 0,00"
            defaultValue={0.0}
            decimalScale={2}
            decimalsLimit={2}
            value={content.amount}
            intlConfig={{
              locale: "pt-BR",
              currency: "BRL",
            }}
            onValueChange={(e) => {
              setPaymentDonateState((prev: IPaymentDonateState) => ({
                ...prev,
                content: {
                  ...prev.content,
                  amount: e,
                },
              }));
            }}
          />
        )}

        {content.currency === "BTC" && (
          <CurrencyInput
            className="rounded-xl"
            customInput={Input}
            id="input-example"
            name="input-name"
            placeholder="0"
            defaultValue={0}
            decimalScale={0}
            decimalsLimit={0}
            value={content.amount}
            onValueChange={(e) => {
              setPaymentDonateState((prev: IPaymentDonateState) => ({
                ...prev,
                content: {
                  ...prev.content,
                  amount: e,
                },
              }));
            }}
          />
        )}
      </div>
      <Button
        className="mt-4 w-full rounded-xl"
        onClick={() => sendMessageAndCreateQRCode()}
      >
        {loadingCreateQRCode ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "CONTINUAR"
        )}
      </Button>
    </>
  );
};

export default MessageStep;
