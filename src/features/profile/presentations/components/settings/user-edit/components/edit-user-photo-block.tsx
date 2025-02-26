import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileImageUploader from "../../../profile-image-uploader";
import { LoaderCircle, UserRound } from "lucide-react";
import { IAuthUserState } from "@/features/auth/contracts/IRecoilState";
import { profileState } from "@/features/profile/states/atoms";
import { useRecoilValue } from "recoil";

export const EditUserPhotoBlock = ({ user }: { user: IAuthUserState }) => {
  const { controller } = useRecoilValue(profileState);
  const { isLoadingUpdatePhoto } = controller;

  return (
    <div className="flex items-center justify-between flex-col md:flex-row">
      <div className="flex items-center gap-2 flex-col md:flex-row">
        <Avatar className="cursor-pointer w-28 h-28 p-1 rounded-full border ">
          {isLoadingUpdatePhoto && (
            <div className="w-full h-full backdrop-blur absolute flex items-center justify-center opacity-70">
              <LoaderCircle className="w-5 h-5 animate-spin" />
            </div>
          )}
          <AvatarImage
            src={user?.photoUrl}
            className="object-cover rounded-full"
          />
          <AvatarFallback>
            <UserRound className="h-8 w-8 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-center md:text-start ">
          <span>Foto de perfil</span>
          <span className="text-sm text-muted-foreground">
            PNG, JPEG. Tamanho máx: 25mb{" "}
          </span>
        </div>
      </div>

      <div>
        <ProfileImageUploader />
      </div>
    </div>
  );
};
