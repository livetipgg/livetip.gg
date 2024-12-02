/* eslint-disable @typescript-eslint/no-explicit-any */
import createApiInstance from "@/config/api";
import { authState } from "@/features/auth/states/atoms";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { useRecoilState } from "recoil";
import { profileState } from "../states/atoms";
import { IUpdateProfilePayload } from "../contracts/IRecoilState";
import { useProfileGetUserInfoUseCase } from "./useProfileGetUserInfoUseCase";

export const useUpdateProfileAccount = () => {
  const api = createApiInstance();
  const [auth] = useRecoilState(authState);
  const [, setProfileState] = useRecoilState(profileState);

  const { getUserInfo } = useProfileGetUserInfoUseCase();

  const { successSonner, errorSonner } = useCustomSonner();

  const { user } = auth;

  const updateProfile = async (payload: Partial<IUpdateProfilePayload>) => {
    setProfileState((prev) => ({
      ...prev,
      controller: {
        ...prev.controller,
        isLoadingUpdateProfile: true,
      },
    }));

    try {
      const formData = new FormData();

      if (payload.photoUrl) {
        formData.append("photo", payload.photoUrl);
      }

      if (Object.keys(payload).length > 0) {
        formData.append("body", JSON.stringify(payload));
      }

      await api.patch(`/user/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      successSonner("Perfil atualizado com sucesso!");
      getUserInfo();
    } catch (error: any) {
      console.error("error", error.response);
      errorSonner("Erro ao atualizar o perfil: " + error.response.data.message);
    } finally {
      setProfileState((prev) => ({
        ...prev,
        controller: {
          ...prev.controller,
          isLoadingUpdateProfile: false,
        },
      }));
    }
  };

  return {
    updateProfile,
  };
};
