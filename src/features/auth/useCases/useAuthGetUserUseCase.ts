/* eslint-disable @typescript-eslint/no-explicit-any */
import createApiInstance from "@/config/api";
import { authController, authState } from "../states/atoms";
import { useRecoilState } from "recoil";
import { GET_USER } from "@/helpers/apiUrls";

export const useAuthGetUserUseCase = () => {
  const api = createApiInstance();
  const [, setAuth] = useRecoilState(authState);
  const [, setAuthController] = useRecoilState(authController);
  const fetchGetUser = async (id: number) => {
    setAuthController((prev) => ({
      ...prev,
      isLoading: true,
      error: "",
    }));
    try {
      const response = await api.post(GET_USER, id);
      console.log("response", response.data);
      setAuthController((prev) => ({
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
        },
      }));
    } catch (error: any) {
      setAuthController((prev) => ({
        ...prev,
        error:
          error.response.data.message ||
          "Não foi possivel carregar os dados do usuário. Tente novamente.",
        isLoading: false,
      }));
    } finally {
      setAuthController((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  return {
    fetchGetUser,
  };
};
