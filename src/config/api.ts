/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const createApiInstance = () => {
  const headers: any = {
    "Content-Type": "application/json",
  };

  const BASE_URL = "http://localhost:8004";

  return axios.create({
    baseURL: BASE_URL,
    headers,
  });
};

export default createApiInstance;
