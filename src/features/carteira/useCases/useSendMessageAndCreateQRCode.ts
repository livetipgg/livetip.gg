import { useRecoilState } from "recoil";
import { paymentDonateState } from "../states/atoms";
import { IPaymentDonateState } from "../contracts/IRecoilState";
import useCreateApiInstance from "@/config/api";
import { MESSAGE } from "@/helpers/apiUrls";
import { useCustomSonner } from "@/hooks/useCustomSonner";

export const useSendMessageAndCreateQRCode = () => {
  const [payment, setPaymentState] = useRecoilState(paymentDonateState);
  const { receiver } = payment;
  const api = useCreateApiInstance();
  const { errorSonner } = useCustomSonner();
  const sendMessageAndCreateQRCode = async () => {
    if (
      !payment.content.sender ||
      !payment.content.content ||
      !payment.content.amount ||
      !payment.content.currency
    ) {
      return errorSonner("Preencha todos os campos para prosseguir.");
    }

    if (
      parseFloat(payment.content.amount) < 1 &&
      payment.content.currency === "BTC"
    ) {
      return errorSonner("O valor mínimo é de R$ 1,00.");
    }

    if (
      parseFloat(
        payment.content.amount.replace("R$", "").replace(",", ".").trim()
      ) < 0.01 && //+
      payment.content.currency === "BRL"
    ) {
      return errorSonner("O valor mínimo é de R$ 0,01.");
    }

    setPaymentState((prev: IPaymentDonateState) => ({
      ...prev,
      controller: {
        ...prev.controller,
        loadingCreateQRCode: true,
      },
    }));

    try {
      const amountWithoutPrefix = payment.content.amount
        .replace("R$", "")
        .replace(",", ".")
        .trim();

      const updatedContent = {
        ...payment.content,
        amount: amountWithoutPrefix,
      };

      const response = await api.post(
        `${MESSAGE}/${receiver.id}`,
        updatedContent
      );

      setPaymentState((prev: IPaymentDonateState) => ({
        ...prev,
        controller: {
          ...prev.controller,
          currentStep: "PAYMENT",
          qrCode: response.data.code,
        },
      }));
    } catch (err) {
      console.log("error", err);
    } finally {
      setPaymentState((prev: IPaymentDonateState) => ({
        ...prev,
        controller: {
          ...prev.controller,
          loadingCreateQRCode: false,
        },
      }));
    }
  };

  return {
    sendMessageAndCreateQRCode,
  };
};
