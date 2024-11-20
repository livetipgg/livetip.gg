import useCreateApiInstance from "@/config/api";
import { useSetRecoilState } from "recoil";
import { adminState } from "../state/atoms";
import { useCustomSonner } from "@/hooks/useCustomSonner";

export const useAdminCreateUserUseCase = () => {
  const api = useCreateApiInstance();
  const setAdminState = useSetRecoilState(adminState);
  const { errorSonner, successSonner } = useCustomSonner();
  const createUser = async (
    username: string,
    password: string,
    onSuccess: () => void
  ) => {
    setAdminState((old) => ({
      ...old,
      controller: {
        ...old.controller,
        isLoadingCreateUser: true,
        errorCreateUser: "",
      },
    }));

    try {
      const response = await api.post("/user/register", { username, password });

      successSonner(`Usuário ${username} criado com sucesso!`);
      onSuccess();
      return response;
    } catch (error) {
      errorSonner("Erro ao criar usuário");
      setAdminState((old) => ({
        ...old,
        controller: {
          ...old.controller,
          isLoadingCreateUser: false,
          errorCreateUser: error.message,
        },
      }));
    } finally {
      setAdminState((old) => ({
        ...old,
        controller: {
          ...old.controller,
          isLoadingCreateUser: false,
        },
      }));
    }
  };

  return { createUser };
};
