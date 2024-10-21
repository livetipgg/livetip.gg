import useCreateApiInstance from "@/config/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { IMessageState } from "../contracts/IRecoilState";
import { messageState } from "../states/atoms";
import { MESSAGE } from "@/helpers/apiUrls";
import { authState } from "@/features/auth/states/atoms";
import { format } from "date-fns";

export const useLoadTransmissionMessagesUseCase = () => {
  const [, setMessageState] = useRecoilState(messageState);
  const { user } = useRecoilValue(authState);
  const api = useCreateApiInstance();

  const start = new Date();
  start.setMonth(start.getMonth() - 1);
  const today = format(new Date(), "yyyy-MM-dd");

  const loadTransmissionMessages = async () => {
    setMessageState((prevState: IMessageState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        errorMessages: "",
        isLoadingTransmissionMessages: true,
      },
    }));

    try {
      const response = await api.get(`${MESSAGE}/${user.id}`, {
        params: {
          startDate: start,
          endDate: today,
          limit: 9999,
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
