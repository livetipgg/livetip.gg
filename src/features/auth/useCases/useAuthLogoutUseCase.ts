import { useResetRecoilState } from "recoil";
import { authController, authState } from "../states/atoms";
import { useNavigate } from "react-router-dom";
import { deleteHeaderToken } from "@/config/api";

export const useAuthLogoutUseCase = () => {
  const resetAuthState = useResetRecoilState(authState);
  const resetAuthControllerState = useResetRecoilState(authController);
  const navigate = useNavigate();
  const handleLogout = () => {
    resetAuthControllerState();
    resetAuthState();
    deleteHeaderToken();

    navigate("/login");
  };

  return {
    handleLogout,
  };
};
