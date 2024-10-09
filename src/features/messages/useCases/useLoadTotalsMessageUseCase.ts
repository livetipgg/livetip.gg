import useCreateApiInstance from "@/config/api";
import { useRecoilState } from "recoil";
import { IMessageState } from "../contracts/IRecoilState";
import { messageState } from "../states/atoms";
import { MESSAGE } from "@/helpers/apiUrls";

interface ILoadTotalsMessageParams {
  startDate: string;
  endDate: string;
}

export const useLoadTotalsMessageUseCase = () => {
  const [, setMessageState] = useRecoilState(messageState);
  // const { user } = useRecoilValue(authState);
  const api = useCreateApiInstance();

  const loadTotalsMessage = async (params: ILoadTotalsMessageParams) => {
    setMessageState((prevState: IMessageState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        isLoadingTotals: true,
      },
    }));

    try {
      const response = await api.get(`${MESSAGE}/1/totals`, {
        params,
      });
      setMessageState((prevState: IMessageState) => ({
        ...prevState,
        totals: {
          total: response.data.total,
          count: response.data.count,
        },
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setMessageState((prevState: IMessageState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          isLoadingTotals: false,
        },
      }));
    }
  };

  return { loadTotalsMessage };
};
