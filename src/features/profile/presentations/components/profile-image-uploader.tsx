// components/ProfileImageUploader.tsx
import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRecoilValue } from "recoil";
import { ImagePreview } from "./image-preview";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { profileState } from "../../states/atoms";

const ProfileImageUploader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { controller } = useRecoilValue(profileState);
  const { newPhotoUrl } = controller;
  const { imagePreview, handleFileChange, deleteImage, uploadImage } =
    useImageUploader();

  const handleClick = () => {
    inputFileRef.current?.click();
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      await handleFileChange(selectedFile);
    }
  };

  const handleRemovePhoto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteImage();
  };
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <AlertDialogTrigger asChild>
        <div className="flex items-center gap-2 flex-col md:flex-row">
          <Button variant="secondary" className="w-full md:w-fit">
            Mudar foto
          </Button>
          <Button variant="destructive_secondary" onClick={handleRemovePhoto}>
            Remover foto
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Alterar foto de perfil</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col">
            Clique na imagem para alterar ou carregue uma nova.
            <span>Formatos permitidos: .png, .jpg, .jpeg</span>
          </AlertDialogDescription>
          <div className="flex items-center justify-center pt-4">
            <ImagePreview imagePreview={imagePreview} onClick={handleClick} />
            <input
              type="file"
              ref={inputFileRef}
              onChange={onFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="link" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <AlertDialogAction
            disabled={!imagePreview || !newPhotoUrl}
            onClick={() => {
              uploadImage(newPhotoUrl);
              setIsOpen(false);
            }}
          >
            Salvar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProfileImageUploader;
