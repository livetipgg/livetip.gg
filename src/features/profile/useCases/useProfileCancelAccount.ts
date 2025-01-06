/* eslint-disable @typescript-eslint/no-explicit-any */
import createApiInstance from "@/config/api";
import { useAuthLogoutUseCase } from "@/features/auth/useCases/useAuthLogoutUseCase";
import { DELETE_USER } from "@/helpers/apiUrls";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { useRecoilState } from "recoil";
import { profileState } from "../states/atoms";

export const useProfileCancelAccount = () => {
  const api = createApiInstance();
  const [, setProfileState] = useRecoilState(profileState);

  const { handleLogout } = useAuthLogoutUseCase();

  const { successSonner } = useCustomSonner();

  const handleCancelAccount = async (id: number) => {
    setProfileState((prev) => ({
      ...prev,
      controller: {
        ...prev.controller,
        isLoadingCancelAccount: true,
        isLoadingUpdateProfile: false,
      },
    }));
    try {
      const response = await api.delete(`${DELETE_USER}/${id}`);

      successSonner(
        "Conta encerrada com sucesso, redirecionando para a página inicial"
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
          isLoadingCancelAccount: false,
        },
      }));
    }
  };

  return {
    handleCancelAccount,
  };
};
