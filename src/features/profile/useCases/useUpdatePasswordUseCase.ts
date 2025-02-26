/* eslint-disable @typescript-eslint/no-explicit-any */
import createApiInstance from "@/config/api";
import { authState } from "@/features/auth/states/atoms";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { useRecoilState } from "recoil";
import { profileState } from "../states/atoms";

type IPayload = {
  currentPassword: string;
  newPassword: string;
};

export const useUpdatePasswordUseCase = () => {
  const api = createApiInstance();
  const [auth] = useRecoilState(authState);
  const [, setProfileState] = useRecoilState(profileState);

  const { errorSonner } = useCustomSonner();

  const { user } = auth;

  const updatePassword = async (
    payload: IPayload,
    id?: number,
    onSuccess?: () => void
  ) => {
    setProfileState((prev) => ({
      ...prev,
      controller: {
        ...prev.controller,
        isLoadingUpdateProfile: true,
      },
    }));

    try {
      await api.patch(`/user/${id || user.id}/password`, payload);

      onSuccess();
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
    updatePassword,
  };
};
