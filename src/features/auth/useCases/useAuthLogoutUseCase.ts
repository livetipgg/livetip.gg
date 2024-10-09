import { useResetRecoilState } from "recoil";
import { authController, authState } from "../states/atoms";
import { deleteHeaderToken } from "@/config/api";

export const useAuthLogoutUseCase = () => {
  const resetAuthState = useResetRecoilState(authState);
  const resetAuthControllerState = useResetRecoilState(authController);
  const handleLogout = () => {
    resetAuthControllerState();
    resetAuthState();
    deleteHeaderToken();
  };

  return {
    handleLogout,
  };
};
