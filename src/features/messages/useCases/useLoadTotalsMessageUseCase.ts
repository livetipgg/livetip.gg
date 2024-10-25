import useCreateApiInstance from "@/config/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { IMessageState } from "../contracts/IRecoilState";
import { messageState } from "../states/atoms";
import { MESSAGE } from "@/helpers/apiUrls";
import { authState } from "@/features/auth/states/atoms";
import { format } from "date-fns";

export const useLoadTotalsMessageUseCase = () => {
  const [, setMessageState] = useRecoilState(messageState);
  const { user } = useRecoilValue(authState);
  const api = useCreateApiInstance();

  const start = new Date();
  start.setMonth(start.getMonth() - 1);
  start.setDate(start.getDate() - 1);

  const end = new Date();
  end.setDate(end.getDate() + 1);

  const loadTotalsMessage = async () => {
    setMessageState((prevState: IMessageState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        errorTotals: "",
        isLoadingTotals: true,
      },
    }));

    try {
      const response = await api.get(`${MESSAGE}/${user.id}/totals`, {
        params: {
          startDate: format(start, "yyyy-MM-dd"),
          endDate: format(end, "yyyy-MM-dd"),
        },
      });
      setMessageState((prevState: IMessageState) => ({
        ...prevState,
        totals: response.data,
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
