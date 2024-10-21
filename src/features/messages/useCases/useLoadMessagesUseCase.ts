/* eslint-disable @typescript-eslint/no-explicit-any */
import useCreateApiInstance from "@/config/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { IMessageState } from "../contracts/IRecoilState";
import { messageState } from "../states/atoms";
import { MESSAGE } from "@/helpers/apiUrls";
import { authState } from "@/features/auth/states/atoms";

export const useLoadMessagesUseCase = () => {
  const [message, setMessageState] = useRecoilState(messageState);
  const { controller } = message;
  const { messagesParams } = controller;
  const { user } = useRecoilValue(authState);
  const api = useCreateApiInstance();

  interface LoadMessagesParams {
    limit?: number;
    page?: number;
    query?: string; // Adicionando query como opcional
  }

  const loadMessages = async (params?: LoadMessagesParams) => {
    setMessageState((prevState: IMessageState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        errorMessages: "",
        isLoadingMessages: true,
      },
    }));

    try {
      if (!params?.page) {
        setMessageState((prevState: IMessageState) => ({
          ...prevState,
          controller: {
            ...prevState.controller,
            messagesParams: {
              ...prevState.controller.messagesParams,
              page: 1,
            },
          },
        }));
      }

      // Criar um objeto de queryParams condicionalmente
      const queryParams: any = {
        limit: params?.limit || messagesParams.limit,
        page: params?.page || messagesParams.page,
        ordered: true, // Se `ordered` for sempre necessário
        query: params?.query || messagesParams.query || null,
        startDate: messagesParams.startDate,
        endDate: messagesParams.endDate,
      };

      // Adicionar `query` apenas se ela existir e não for vazia
      if (params?.query && params.query.trim() !== "") {
        queryParams.query = params.query;
      }

      const response = await api.get(`${MESSAGE}/${user.id}`, {
        params: queryParams,
      });

      setMessageState((prevState: IMessageState) => ({
        ...prevState,
        messages: response.data,
      }));
    } catch {
      setMessageState((prevState: IMessageState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          errorMessages:
            "Houve um erro ao carregar as mensagens, por favor tente novamente.",
        },
      }));
    } finally {
      setMessageState((prevState: IMessageState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          isLoadingMessages: false,
        },
      }));
    }
  };

  return { loadMessages };
};
