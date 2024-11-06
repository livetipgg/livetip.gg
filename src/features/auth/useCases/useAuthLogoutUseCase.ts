import { useResetRecoilState } from "recoil";
import { authController, authState } from "../states/atoms";
import { deleteHeaderToken } from "@/config/api";
import { useNavigate } from "react-router-dom";

export const useAuthLogoutUseCase = () => {
  const resetAuthState = useResetRecoilState(authState);
  const resetAuthControllerState = useResetRecoilState(authController);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    resetAuthControllerState();
    resetAuthState();
    deleteHeaderToken();
  };

  return {
    handleLogout,
  };
};
