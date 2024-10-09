import useCreateApiInstance from "@/config/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { IMessageState } from "../contracts/IRecoilState";
import { messageState } from "../states/atoms";
import { MESSAGE } from "@/helpers/apiUrls";
import { authState } from "@/features/auth/states/atoms";

interface ILoadTotalsMessageParams {
  startDate: string;
  endDate: string;
}

export const useLoadTotalsMessageUseCase = () => {
  const [, setMessageState] = useRecoilState(messageState);
  const { user } = useRecoilValue(authState);
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
      const response = await api.get(`${MESSAGE}/${user.id}/totals`, {
        params,
      });
      setMessageState((prevState: IMessageState) => ({
        ...prevState,
        totals: {
          total: response.data.total,
          count: response.data.count,
        },
      }));
    } catch {
      setMessageState((prevState: IMessageState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          errorTotals:
            "Houve um erro ao carregar os totais, por favor tente novamente.",
        },
      }));
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
