/* eslint-disable @typescript-eslint/no-explicit-any */
import { authController, authState } from "../states/atoms";
import { useRecoilState } from "recoil";
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
      const response = await api.get(`/user/${id}`);
      setAuthController((prev: any) => ({
        ...prev,
        isLoading: false,
        isAuthenticated: true,
        error: "",
      }));
      console.log("response", response);
      setAuth((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          email: response.data.email,
          instagramUsername: response.data.instagramUsername,
          facebookUsername: response.data.facebookUsername,
          nostrUsername: response.data.nostrUsername,
          photoUrl: response.data.photoUrl,
          telegramUsername: response.data.telegramUsername,
          whatsappUsername: response.data.whatsappUsername,
          xUsername: response.data.xUsername,
          username: response.data.username,
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

  const getUser = async (id: number) => {
    setAuthController((prev: any) => ({
      ...prev,
      isLoading: true,
      error: "",
    }));
    try {
      const response = await api.get(`/user/${id}`);
      setAuthController((prev: any) => ({
        ...prev,
        isLoading: false,
        isAuthenticated: true,
        error: "",
      }));
      console.log("response", response);
      return response.data;
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
    getUser,
  };
};
