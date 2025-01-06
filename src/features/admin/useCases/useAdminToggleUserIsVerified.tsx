import useCreateApiInstance from "@/config/api";
import { profileState } from "@/features/profile/states/atoms";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

export const useAdminToggleUserIsVerified = () => {
  const api = useCreateApiInstance();
  const [, setAdminState] = useRecoilState(profileState);
  const { errorSonner } = useCustomSonner();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["admin_users"],
    mutationFn: async ({
      id,
      isVerified,
    }: {
      id: string;
      isVerified: boolean;
    }) => {
      setAdminState((prev) => ({
        ...prev,
        controller: {
          ...prev.controller,
          isLoadingUpdateProfile: true,
        },
      }));

      const formData = new FormData();
      const payload = {
        is_verified: !isVerified,
      };
      formData.append("body", JSON.stringify(payload));

      try {
        await api.patch(`/user/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error:", error.response);
        throw new Error(
          error.response?.data?.message || "Erro ao atualizar o perfil."
        );
      } finally {
        setAdminState((prev) => ({
          ...prev,
          controller: {
            ...prev.controller,
            isLoadingUpdateProfile: false,
          },
        }));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_users"] });
    },
    onError: (error) => {
      errorSonner(`Erro ao atualizar o perfil: ${error.message}`);
    },
  });

  const toggleUserIsVerified = (id, isVerified) => {
    mutation.mutate({ id, isVerified });
  };

  return {
    toggleUserIsVerified,
  };
};
