import { useSetRecoilState } from "recoil";
import { authController, authState } from "../states/atoms";
import { useNavigate } from "react-router-dom";

export const useAuthLogoutUseCase = () => {
  const resetAuthState = useSetRecoilState(authState);
  const resetAuthControllerState = useSetRecoilState(authController);
  const navigate = useNavigate();
  const handleLogout = () => {
    resetAuthControllerState({
      isLoading: false,
      isAuthenticated: false,
      error: "",
      loginType: "credencials",
    });
    resetAuthState({
      user: {
        id: "",
        name: "",
        pin: "",
        email: "",
        token: "",
        username: "",
        _id: "",
        updatedAt: "",
        one_time_password: "",
      },
    });

    navigate("/login");
  };

  return {
    handleLogout,
  };
};
