import { useSetRecoilState } from "recoil";
import { balanceState } from "../states/atoms";

export const useSetShowCurrentBalanceUseCase = () => {
  const setBalanceState = useSetRecoilState(balanceState);

  const setShowCurrentBalance = (showCurrentBalance: boolean) => {
    setBalanceState((prevState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        showCurrentBalance,
      },
    }));
  };

  return { setShowCurrentBalance };
};
