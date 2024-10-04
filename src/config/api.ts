/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const createApiInstance = () => {
  const headers: any = {
    "Content-Type": "application/json",
  };

  const BASE_URL = "http://localhost:3000/api/v1/";

  return axios.create({
    baseURL: BASE_URL,
    headers,
    withCredentials: true,
  });
};

const setHeaderToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `${token}`;
};

const deleteHeaderToken = () => {
  delete axios.defaults.headers.common.Authorization;
};

export { setHeaderToken, deleteHeaderToken };
export default createApiInstance;
