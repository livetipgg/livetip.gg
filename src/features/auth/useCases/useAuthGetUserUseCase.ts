/* eslint-disable @typescript-eslint/no-explicit-any */
import { authController, authState } from "../states/atoms";
import { useRecoilState } from "recoil";
import { GET_USER } from "@/helpers/apiUrls";
import useCreateApiInstance from "@/config/api";

export const useAuthGetUserUseCase = () => {
  const api = useCreateApiInstance();
  const [, setAuth] = useRecoilState(authState);
  const [, setAuthController] = useRecoilState(authController);
  const fetchGetUser = async (id: number) => {
    setAuthController((prev: any) => ({
      ...prev,
      isLoading: true,
      error: "",
    }));
    try {
      const response = await api.post(GET_USER, id);
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
        },
      }));
    } catch (error: any) {
      setAuthController((prev: any) => ({
        ...prev,
        error:
          error.response.data.message ||
          "Não foi possivel carregar os dados do usuário. Tente novamente.",
        isLoading: false,
      }));
    } finally {
      setAuthController((prev: any) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  return {
    fetchGetUser,
  };
};
