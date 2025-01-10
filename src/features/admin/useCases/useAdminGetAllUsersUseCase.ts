/* eslint-disable @typescript-eslint/no-explicit-any */
import createApiInstance from "@/config/api";

import { useRecoilState } from "recoil";
import { adminState } from "../state/atoms";

export const useAdminGetAllUsersUseCase = () => {
  const api = createApiInstance();
  const [, setAdminState] = useRecoilState(adminState);

  const getAllUsers = async (params: {
    limit: number;
    page: number;
    search?: string;
  }) => {
    setAdminState((prev) => ({
      ...prev,
      users: {
        results: [],
        count: 0,
        totalPages: 0,
      },
      controller: {
        ...prev.controller,
        isLoadingGetAllUsers: true,
      },
    }));

    // Adicionar lógica para evitar envio de `search` vazio
    const apiParams: Record<string, any> = {
      limit: params.limit,
      page: params.page,
    };

    if (params.search && params.search.trim() !== "") {
      apiParams.search = params.search;
    }

    try {
      const response = await api.get(`/user`, {
        params: apiParams, // Usa somente os parâmetros válidos
      });

      setAdminState((prev) => ({
        ...prev,
        users: response.data,
      }));

      return response.data;
    } catch (error: any) {
      console.error("error", error.response?.data?.message || error.message);
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
