/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilState } from "recoil";
import { paymentDonateState } from "../states/atoms";
import { IPaymentDonateState } from "../contracts/IRecoilState";
import useCreateApiInstance from "@/config/api";
import { USER } from "@/helpers/apiUrls";

export const useLoadReceiverData = () => {
  const [, setPaymentState] = useRecoilState(paymentDonateState);
  const api = useCreateApiInstance();
  const loadReceiverData = async (username: string) => {
    setPaymentState((prev: IPaymentDonateState) => ({
      content: {
        sender: "",
        content: "",
        amount: "",
        currency: "BRL",
      },
      receiver: {
        ...prev.receiver,
        id: 0,
        username: "",
        email: "",
        isDeleted: false,
        btcBalance: "",
        brlBalance: "",
      },
      controller: {
        ...prev.controller,
        loadingReceiverData: true,
        errorMessage: "",
      },
    }));

    try {
      const response = await api.get(`${USER}username/${username}`);

      setPaymentState((prev: IPaymentDonateState) => ({
        ...prev,
        receiver: response.data,
        controller: {
          ...prev.controller,
          currentStep: "MESSAGE",
          qrCode: "",
        },
      }));
    } catch (err: any) {
      setPaymentState((prev: IPaymentDonateState) => ({
        ...prev,
        controller: {
          ...prev.controller,
          errorMessage:
            err.response.data.message ||
            "Houve um erro ao carregar as informações ou essa pagina não existe. Por favor revise as informações",
        },
      }));
    } finally {
      setPaymentState((prev: IPaymentDonateState) => ({
        ...prev,
        controller: {
          ...prev.controller,
          loadingReceiverData: false,
        },
      }));
    }
  };

  return {
    loadReceiverData,
  };
};
