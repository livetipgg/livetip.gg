import useCreateApiInstance from "@/config/api";
import { useRecoilState } from "recoil";
import { IMessageState } from "../contracts/IRecoilState";
import { messageState } from "../states/atoms";
import { MESSAGE } from "@/helpers/apiUrls";
import { useLoadTransmissionMessagesUseCase } from "./useLoadTransmissionMessagesUseCase";

export const useSetMessageReadUseCase = () => {
  const { loadTransmissionMessages } = useLoadTransmissionMessagesUseCase();
  const [, setMessageState] = useRecoilState(messageState);
  const api = useCreateApiInstance();

  const setMessageRead = async (messageId: string) => {
    setMessageState((prevState: IMessageState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        errorMessages: "",
      },
    }));

    try {
      const response = await api.patch(`${MESSAGE}/${messageId}/read`);
      loadTransmissionMessages();

      return response;
    } catch {
      console.log("Error");
    } finally {
      console.log("Finnaly");
    }
  };

  const setMessageUnread = async (messageId: string) => {
    setMessageState((prevState: IMessageState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        errorMessages: "",
      },
    }));

    try {
      const response = await api.patch(`${MESSAGE}/${messageId}/unread`);
      loadTransmissionMessages({});

      return response;
    } catch {
      console.log("Error");
    } finally {
      console.log("Finnaly");
    }
  };

  return { setMessageRead, setMessageUnread };
};
