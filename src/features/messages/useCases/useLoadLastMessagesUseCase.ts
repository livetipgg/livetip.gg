import useCreateApiInstance from "@/config/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { IMessageState } from "../contracts/IRecoilState";
import { messageState } from "../states/atoms";
import { MESSAGE } from "@/helpers/apiUrls";
import { authState } from "@/features/auth/states/atoms";

export const useLoadLastMessagesUseCase = () => {
  const [, setMessageState] = useRecoilState(messageState);
  const { user } = useRecoilValue(authState);
  const api = useCreateApiInstance();

  const loadLastMessages = async () => {
    const params = {
      ordered: true,
      pageSize: 4,
      page: 1,
      startDate: "2002-10-02",
      endDate: "2024-10-10",
    };

    setMessageState((prevState: IMessageState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        isLoadingLastMessages: true,
      },
    }));

    try {
      const response = await api.get(`${MESSAGE}/${user.id}`, {
        params,
      });
      setMessageState((prevState: IMessageState) => ({
        ...prevState,
        lastMessages: response.data,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setMessageState((prevState: IMessageState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          isLoadingLastMessages: false,
        },
      }));
    }
  };

  return { loadLastMessages };
};
