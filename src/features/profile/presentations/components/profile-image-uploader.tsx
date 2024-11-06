import { useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/firebase";
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
import { LoaderCircle, Upload } from "lucide-react";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "@/features/auth/states/atoms";

const ProfileImageUploader: React.FC = () => {
  const setAuthState = useSetRecoilState(authState);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useRecoilValue(authState);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { successSonner } = useCustomSonner();

  const handleClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImagePreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(selectedFile);

      const storageRef = ref(
        storage,
        `profile_images/${user.id}/${selectedFile.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log("Progress: " + progress);
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          // Aqui você pode atualizar o estado do usuário com a nova URL da imagem
          successSonner("Imagem carregada com sucesso!");
          setUploadProgress(null); // Reseta o progresso após o upload
        }
      );
    }
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        // remove a imagem do state
        setImagePreview(null);
        setIsOpen(open);
      }}
    >
      <AlertDialogTrigger className="p-0 m-0" asChild>
        <Button variant="link">Editar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Alterar foto de perfil</AlertDialogTitle>
          <AlertDialogDescription>
            Clique na imagem para alterar ou carregue uma nova. A imagem será
            redimensionada para 128x128 pixels.
          </AlertDialogDescription>
          <div className="flex items-center justify-center pt-4">
            <div
              onClick={handleClick} // Torna a div clicável
              className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-400 cursor-pointer hover:bg-card-custom p-1"
            >
              <input
                type="file"
                ref={inputFileRef}
                onChange={handleFileChange}
                className="hidden" // Esconde o input
                accept="image/*"
              />
              {uploadProgress !== null ? (
                <div className="flex flex-col items-center justify-center">
                  <LoaderCircle className="w-5 h-5 animate-spin" />
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
              ) : (
                <>
                  {!imagePreview && <Upload className="w-6 h-6 text-primary" />}
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="link"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancelar
          </Button>
          <AlertDialogAction
            onClick={() => {
              setIsOpen(false);
              setAuthState((prevState) => ({
                ...prevState,
                user: {
                  ...prevState.user,
                  avatar_url: imagePreview as string,
                },
              }));
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
