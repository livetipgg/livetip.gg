import { useState } from "react";
import { resizeImage } from "@/helpers/resizeImage";
import useCreateApiInstance from "@/config/api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "@/features/auth/states/atoms";
import { useCustomSonner } from "./useCustomSonner";
import { useUpdateProfileAccount } from "@/features/profile/useCases/useUpdateProfileUseCase";
import { profileState } from "@/features/profile/states/atoms";
import { useProfileGetUserInfoUseCase } from "@/features/profile/useCases/useProfileGetUserInfoUseCase";

export const useImageUploader = () => {
  const { updateProfile } = useUpdateProfileAccount();
  const { user } = useRecoilValue(authState);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { successSonner, errorSonner } = useCustomSonner();
  const api = useCreateApiInstance();
  const setNewPhotoState = useSetRecoilState(profileState);
  const { getUserInfo } = useProfileGetUserInfoUseCase();

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      const response = await api.patch(`/user/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getUserInfo();

      successSonner("Foto de perfil atualizada com sucesso");
      resetImage();
      return response;
    } catch (error) {
      console.error("Upload failed:", error);
      errorSonner("Erro ao atualizar a foto de perfil");
    }
  };

  const handleFileChange = async (file: File) => {
    try {
      const resizedImageBlob = await resizeImage(file, 200);
      const resizedFile = new File([resizedImageBlob], file.name, {
        type: file.type,
      });

      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImagePreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(resizedFile);

      setNewPhotoState((prev) => ({
        ...prev,
        controller: {
          ...prev.controller,
          newPhotoUrl: resizedFile,
        },
      }));

      return resizedFile;
    } catch (error) {
      console.error("Image resizing failed:", error);
    }
  };

  const resetImage = () => {
    setUploadProgress(null);
    setImagePreview(null);
  };

  const deleteImage = async () => {
    updateProfile({ photoUrl: null });
  };

  return {
    imagePreview,
    uploadProgress,
    handleFileChange,
    resetImage,
    uploadImage,
    deleteImage,
  };
};
