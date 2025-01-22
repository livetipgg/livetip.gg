import useCreateApiInstance from "@/config/api";
import { authState } from "@/features/auth/states/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileState } from "../states/atoms";
import { useCustomSonner } from "@/hooks/useCustomSonner";

export const useProfileVerifyEmailUseCase = () => {
  const { user } = useRecoilValue(authState);
  const [, setProfileState] = useRecoilState(profileState);
  const api = useCreateApiInstance();
  const { successSonner, errorSonner } = useCustomSonner();
  const sendCodeToEmail = async (email?: string, onSuccess?: VoidFunction) => {
    setProfileState((prev) => ({
      ...prev,
      controller: {
        ...prev.controller,
        isLoadingSendCodeToEmail: true,
      },
    }));
    try {
      const response = await api.post("/user/verify-email", {
        email: email || user.email,
      });

      onSuccess();
      return response.data;
    } catch (error) {
      return error.response.data;
    } finally {
      setProfileState((prev) => ({
        ...prev,
        controller: {
          ...prev.controller,
          isLoadingSendCodeToEmail: false,
        },
      }));
    }
  };

  const verifyCode = async (
    code: string,
    onSuccess: VoidFunction,
    onError: VoidFunction
  ) => {
    setProfileState((prev) => ({
      ...prev,
      controller: {
        ...prev.controller,
        isLoadingUpdateProfile: true,
      },
    }));
    const formData = new FormData();
    if (code) {
      formData.append(
        "body",
        JSON.stringify({
          verificationCode: code,
        })
      );
    }
    try {
      const response = await api.patch(`/user/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      successSonner("Email verificado com sucesso!");

      onSuccess();
      return response.data;
    } catch (error) {
      errorSonner(error.response.data.message);
      onError();
      return error.response.data;
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

  return { sendCodeToEmail, verifyCode };
};
