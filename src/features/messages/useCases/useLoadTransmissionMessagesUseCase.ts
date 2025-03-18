import useCreateApiInstance from "@/config/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { IMessageState } from "../contracts/IRecoilState";
import { messageState } from "../states/atoms";
import { MESSAGE } from "@/helpers/apiUrls";
import { authState } from "@/features/auth/states/atoms";

export const useLoadTransmissionMessagesUseCase = () => {
  const [state, setMessageState] = useRecoilState(messageState);
  const { user } = useRecoilValue(authState);
  const api = useCreateApiInstance();

  const start = new Date();
  start.setDate(start.getDate());
  start.setHours(0, 0, 0, 0);

  // Configura a data de fim para o dia seguinte às 23:59
  const end = new Date();
  end.setDate(end.getDate() + 1);
  end.setHours(23, 59, 59, 999);

  const loadTransmissionMessages = async ({
    startDate,
    endDate,
  }: {
    startDate?: Date;
    endDate?: Date;
  }) => {
    setMessageState((prevState: IMessageState) => ({
      ...prevState,
      lastMessages: {
        ...prevState.lastMessages,
        messages: [],
      },
      transmissionMessages: {
        ...prevState.transmissionMessages,
      },
      messages: {
        ...prevState.messages,
        results: [],
      },
      controller: {
        ...prevState.controller,
        errorMessages: "",
        isLoadingTransmissionMessages: true,
      },
    }));

    try {
      const response = await api.get(`${MESSAGE}/${user.id}`, {
        params: {
          limit: 9999,
          page: 1,
          ordered: true,
          startDate:
            startDate ||
            state.controller.transmissionMessagesParams.startDate ||
            start,
          endDate:
            endDate ||
            state.controller.transmissionMessagesParams.endDate ||
            end,
        },
      });

      setMessageState((prevState: IMessageState) => ({
        ...prevState,
        transmissionMessages: response.data,
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
          isLoadingTransmissionMessages: false,
        },
      }));
    }
  };

  return { loadTransmissionMessages };
};
