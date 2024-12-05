/* eslint-disable @typescript-eslint/no-explicit-any */
import createApiInstance from "@/config/api";

import { useRecoilState } from "recoil";
import { adminState } from "../state/atoms";

export const useAdminGetAllUsersUseCase = () => {
  const api = createApiInstance();
  const [, setAdminState] = useRecoilState(adminState);

  const getAllUsers = async (params: { limit: number; page: number }) => {
    setAdminState((prev) => ({
      ...prev,
      controller: {
        ...prev.controller,
        isLoadingGetAllUsers: true,
      },
    }));
    try {
      const response = await api.get(`/user`, {
        params: {
          limit: params.limit,
          page: params.page,
        },
      });

      setAdminState((prev) => ({
        ...prev,
        users: response.data,
      }));

      return response.data;
    } catch (error: any) {
      console.error("error", error.response.data.message);
    } finally {
      setAdminState((prev) => ({
        ...prev,
        controller: {
          ...prev.controller,
          isLoadingGetAllUsers: false,
        },
      }));
    }
  };

  return {
    getAllUsers,
  };
};
