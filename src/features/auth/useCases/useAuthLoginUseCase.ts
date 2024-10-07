/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAuthLoginPayload } from "../contracts/IAuthPayload";
import createApiInstance, { setHeaderToken } from "@/config/api";
import { authController, authState } from "../states/atoms";
import { useRecoilState } from "recoil";
import { LOGIN } from "@/helpers/apiUrls";

export const useAuthLoginUseCase = () => {
  const api = createApiInstance();
  const [, setAuth] = useRecoilState(authState);
  const [, setAuthController] = useRecoilState(authController);
  const fetchLogin = async (payload: IAuthLoginPayload) => {
    setAuthController((prev: any) => ({
      ...prev,
      isLoading: true,
      error: "",
    }));
    try {
      const response = await api.post(LOGIN, payload);
      setAuthController((prev: any) => ({
        ...prev,
        isLoading: false,
        isAuthenticated: true,
        error: "",
      }));
      setAuth((prev) => ({
        ...prev,

        user: {
          ...prev.user,
          ...response.data.user,
          token: response.data.token,
        },
      }));

      // setar no header da api o token
      setHeaderToken(response.data.token);
    } catch (error: any) {
      setAuthController((prev: any) => ({
        ...prev,
        error:
          error.response.data.message ||
          "Não foi possível realizar o login. Verifique suas credenciais e tente novamente.",
        isLoading: false,
      }));
    } finally {
      setAuthController((prev: any) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const handleLogin = async (payload: IAuthLoginPayload) => {
    await fetchLogin(payload);
  };

  return {
    handleLogin,
  };
};
