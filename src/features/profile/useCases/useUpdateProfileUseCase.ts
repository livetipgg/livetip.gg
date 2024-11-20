/* eslint-disable @typescript-eslint/no-explicit-any */
import createApiInstance from "@/config/api";
import { authState } from "@/features/auth/states/atoms";
import { useAuthLogoutUseCase } from "@/features/auth/useCases/useAuthLogoutUseCase";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { useRecoilState } from "recoil";
import { profileState } from "../states/atoms";
import { IUpdateProfilePayload } from "../contracts/IRecoilState";

export const useUpdateProfileAccount = () => {
  const api = createApiInstance();
  const [auth] = useRecoilState(authState);
  const [, setProfileState] = useRecoilState(profileState);

  const { handleLogout } = useAuthLogoutUseCase();

  const { successSonner } = useCustomSonner();

  const { user } = auth;

  const updateProfile = async (payload: IUpdateProfilePayload) => {
    setProfileState((prev) => ({
      ...prev,
      controller: {
        ...prev.controller,
        isLoadingUpdateProfile: true,
      },
    }));
    try {
      const response = await api.patch(`/user/update/${user.id}`, payload);

      successSonner(
        "Perfil atualizado com sucesso! Faça login novamente para ver as alterações."
      );

      handleLogout();

      return response;
    } catch (error: any) {
      console.error("error", error.response.data.message);
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
