/* eslint-disable @typescript-eslint/no-explicit-any */
import { authState } from "@/features/auth/states/atoms";
import { useAuthLogoutUseCase } from "@/features/auth/useCases/useAuthLogoutUseCase";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import axios from "axios";
import { useRecoilValue } from "recoil";

const useCreateApiInstance = () => {
  const { user } = useRecoilValue(authState);
  const { handleLogout } = useAuthLogoutUseCase();
  const { errorSonner } = useCustomSonner();

  const headers: any = {
    "Content-Type": "application/json",
  };

  if (user.token) {
    headers.Authorization = `Baerer ${user.token}`;
  }

  const BASE_URL = import.meta.env.VITE_API_PRODUCTION;
  // : import.meta.env.VITE_API_DEVELOPMENT;

  const api = axios.create({
    baseURL: BASE_URL,
    headers,

    withCredentials: true,
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.code === "ERR_NETWORK") {
        errorSonner(
          "Ocorreu um erro, por favor tente novamente ou entre em contato"
        );
      }

      if (error.response.status === 401) {
        // handleLogout();
        errorSonner("Sessão expirada, faça login novamente");
      }
      return Promise.reject(error);
    }
  );

  return api;
};

const setHeaderToken = (token: string) => {
  localStorage.setItem("token", token);
  axios.defaults.headers.common.Authorization = `${token}`;
};

const deleteHeaderToken = () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common.Authorization;
};

export { setHeaderToken, deleteHeaderToken };
export default useCreateApiInstance;
