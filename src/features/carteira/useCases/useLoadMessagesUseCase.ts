import useCreateApiInstance from "@/config/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { IPaymentState } from "../contracts/IRecoilState";
import { paymentState } from "../states/atoms";
import { PAYMENT } from "@/helpers/apiUrls";
import { authState } from "@/features/auth/states/atoms";

export const useLoadPaymentsUseCase = () => {
  const [payment, setPaymentState] = useRecoilState(paymentState);
  const { controller } = payment;
  const { params: paymentParams } = controller;
  const { user } = useRecoilValue(authState);
  const api = useCreateApiInstance();

  interface LoadPaymentsParams {
    limit?: number;
    page?: number;
  }

  const loadPayments = async (params?: LoadPaymentsParams) => {
    setPaymentState((prevState: IPaymentState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        error: "",
        isLoadingPayments: true,
      },
    }));

    try {
      if (!params?.page) {
        setPaymentState((prevState: IPaymentState) => ({
          ...prevState,
          controller: {
            ...prevState.controller,
            messagesParams: {
              ...prevState.controller.params,
              page: 1,
            },
          },
        }));
      }

      const response = await api.get(`${PAYMENT}/${user.id}`, {
        params: {
          ...paymentParams,
          limit: params?.limit || paymentParams.limit,
          page: params?.page || paymentParams.page,
        },
      });
      setPaymentState((prevState: IPaymentState) => ({
        ...prevState,
        payments: {
          ...prevState.payments,
          results: response.data,
        },
      }));
    } catch {
      setPaymentState((prevState: IPaymentState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          errorMessages:
            "Houve um erro ao carregar as mensagens, por favor tente novamente.",
        },
      }));
    } finally {
      setPaymentState((prevState: IPaymentState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          isLoadingMessages: false,
        },
      }));
    }
  };

  return { loadPayments };
};
