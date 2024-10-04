/* eslint-disable @typescript-eslint/no-explicit-any */
import createApiInstance from "@/config/api";
import { authState } from "@/features/auth/states/atoms";
import { useAuthLogoutUseCase } from "@/features/auth/useCases/useAuthLogoutUseCase";
import { DELETE_USER } from "@/helpers/apiUrls";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { useRecoilState } from "recoil";
import { profileState } from "../states/atoms";

export const useProfileCancelAccount = () => {
  const api = createApiInstance();
  const [auth] = useRecoilState(authState);
  const [, setProfileState] = useRecoilState(profileState);

  const { handleLogout } = useAuthLogoutUseCase();

  const { successSonner } = useCustomSonner();

  const { user } = auth;

  const handleCancelAccount = async () => {
    setProfileState((prev) => ({
      ...prev,
      controller: {
        isLoadingCancelAccount: true,
      },
    }));
    try {
      const response = await api.delete(`${DELETE_USER}/1`);

      console.log("response", response.data);

      successSonner(
        "Conta encerrada com sucesso, redirecionando para a página inicial"
      );
      handleLogout();
    } catch (error: any) {
      console.error("error", error.response.data.message);
    } finally {
      setProfileState((prev) => ({
        ...prev,
        controller: {
          isLoadingCancelAccount: false,
        },
      }));
    }
  };

  return {
    handleCancelAccount,
  };
};
