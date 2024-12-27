import useCreateApiInstance from "@/config/api";
import { useSetRecoilState } from "recoil";
import { adminState } from "../state/atoms";
import { useCustomSonner } from "@/hooks/useCustomSonner";

export const useAdminCreateUserUseCase = () => {
  const api = useCreateApiInstance();
  const setAdminState = useSetRecoilState(adminState);
  const { errorSonner, successSonner } = useCustomSonner();

  // Essa função ta uma merda, tem q refatorar kkkjjk
  const createUser = async (
    username: string,
    password: string,
    onSuccess: () => void,
    confirmPassword?: string,
    email?: string,
    first_name?: string,
    last_name?: string
  ) => {
    if (password !== confirmPassword) {
      errorSonner("As senhas não coincidem");
      return;
    }

    setAdminState((old) => ({
      ...old,
      controller: {
        ...old.controller,
        isLoadingCreateUser: true,
        errorCreateUser: "",
      },
    }));

    try {
      const response = await api.post("/user", {
        username,
        password,
        email,
        first_name,
        last_name,
      });

      successSonner(`Usuário ${username} criado com sucesso!`);
      onSuccess();
      return response;
    } catch (error) {
      setAdminState((old) => ({
        ...old,
        controller: {
          ...old.controller,
          isLoadingCreateUser: false,
          errorCreateUser: error.response.data.message,
        },
      }));
      throw new Error(error.response.data.message);
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
