import { ConfirmAlert } from "@/components/confirm-alert";
import { SectionCard } from "@/components/section-card";
import { SectionTitle } from "@/components/section-title";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { withLayout } from "@/HOC/withLayout";
import { useProfileCancelAccount } from "../useCases/useProfileCancelAccount";
import { useRecoilValue } from "recoil";
import { profileState } from "../states/atoms";
import { Copy, LoaderCircle, UserRound } from "lucide-react";
import { authState } from "@/features/auth/states/atoms";
import { useNavigate } from "react-router-dom";
import { useCustomSonner } from "@/hooks/useCustomSonner";
//  test
const Profile = () => {
  const { user } = useRecoilValue(authState);
  const { handleCancelAccount } = useProfileCancelAccount();
  const { controller } = useRecoilValue(profileState);
  const { isLoadingCancelAccount } = controller;
  const { successSonner } = useCustomSonner();
  const navigate = useNavigate();

  const url = import.meta.env.PROD
    ? import.meta.env.VITE_PRODUCTION_URL
    : import.meta.env.VITE_DEVELOPMENT_URL;

  return (
    <div className="max-w-xl ">
      {/* Dados do perfil */}
      <SectionCard className="mb-5">
        <strong>Dados do perfil</strong>
        <div className="flex flex-col space-y-10 my-10">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="">Foto de perfil</Label>
              {/* <ProfileImageUploader /> */}
            </div>
            <Avatar className="cursor-pointer w-32 h-32">
              <AvatarImage src={user.avatar_url} className="object-cover" />
              <AvatarFallback>
                <UserRound className="h-16 w-16 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="">Nome de usuário</Label>
              {/* <ProfileUsernameUploader /> */}
            </div>
            <Input value={`@${user.username}`} className="p-5" disabled />
          </div>
          {user && user.email && (
            <div className="flex flex-col space-y-2">
              <Label htmlFor="">Email</Label>
              <Input value={user.email} className="p-5" disabled />
            </div>
          )}
          {/* <div className="flex flex-col space-y-2">
            <Label htmlFor="">Redes Sociais</Label>
            <div className="flex items-center gap-2 border rounded-md p-2">
              <Youtube className="w-6 h-6" />
              <span className="text-secondary ">
                wwww.youtube.com/{user.username}
              </span>
            </div>
            <div className="flex items-center gap-2 border rounded-md p-2">
              <InstagramLogoIcon className="w-6 h-6" />
              <span className="text-secondary ">
                wwww.instagram.com/{user.username}
              </span>
            </div>
            <div className="flex items-center justify-end">
              <Button className="w-fit flex " variant="secondary">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div> */}
        </div>
      </SectionCard>
      <SectionCard className="mb-5">
        <strong>Link de doação</strong>
        <div className="flex flex-col  mt-4">
          <div className="max-w-fit bg-background shadow-sm">
            <div className="border rounded flex items-center ">
              <Button
                className="text-secondary"
                variant="link"
                onClick={() => {
                  navigate(`/${user.username}`, {
                    relative: "path",
                  });
                }}
              >
                {url}
                {user.username}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(` ${url}${user.username}`);

                  successSonner("Link copiado com sucesso!");
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </Button>
            </div>
          </div>
        </div>
      </SectionCard>
      {/* Encerrar conta */}
      <SectionCard>
        <strong>Encerrar conta</strong>
        <span className="my-10 text-muted-foreground">
          Ao encerrar sua conta, você perderá todos os seus dados e não poderá
          mais acessar a plataforma.
        </span>
        <div className="mw-fit">
          <ConfirmAlert
            title="Encerrar conta"
            description="Tem certeza que deseja encerrar sua conta? Essa ação não poderá ser desfeita."
            confirmText="Encerrar conta"
            cancelText="Voltar"
            disabled={isLoadingCancelAccount}
            onConfirm={handleCancelAccount}
          >
            <Button
              variant="destructive_secondary"
              className="w-40 "
              disabled={isLoadingCancelAccount}
            >
              {isLoadingCancelAccount ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                "Encerrar conta"
              )}
            </Button>
          </ConfirmAlert>
        </div>
      </SectionCard>
    </div>
  );
};

const ProfilePage = withLayout(Profile, "LiveTip - Meu Perfil");

export default ProfilePage;
