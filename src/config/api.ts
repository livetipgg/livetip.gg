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
    "Access-Control-Allow-Origin": "*",
  };

  if (user.token) {
    headers.Authorization = `${user.token}`;
  }

  // const BASE_URL = "http://localhost:3000/api/v1/";
  const BASE_URL = "https://livechat-437913.uc.r.appspot.com/api/v1/";

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
      if (error.response.status === 401) {
        handleLogout();
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
