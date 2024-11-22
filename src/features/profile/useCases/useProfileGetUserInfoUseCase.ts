/* eslint-disable @typescript-eslint/no-explicit-any */
import createApiInstance from "@/config/api";
import { authState } from "@/features/auth/states/atoms";

import { useRecoilState } from "recoil";

export const useProfileGetUserInfoUseCase = () => {
  const api = createApiInstance();
  const [auth] = useRecoilState(authState);
  const [, setProfileState] = useRecoilState(authState);

  const { user } = auth;

  const getUserInfo = async () => {
    try {
      const response = await api.get(`/user/${user.id}`);

      setProfileState((prev) => ({
        ...prev,

        user: {
          token: prev.user.token,
          ...response.data,
        },
      }));

      return response.data;
    } catch (error: any) {
      console.error("error", error.response.data.message);
    }
  };

  return {
    getUserInfo,
  };
};
