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
import { LoaderCircle, UserRound } from "lucide-react";
import { authState } from "@/features/auth/states/atoms";
const Profile = () => {
  const { user } = useRecoilValue(authState);
  const { handleCancelAccount } = useProfileCancelAccount();
  const { controller } = useRecoilValue(profileState);
  const { isLoadingCancelAccount } = controller;
  return (
    <div className="max-w-xl ">
      <SectionTitle title="Meu Perfil" />
      {/* Dados do perfil */}
      <SectionCard className="mb-5">
        <strong>Dados do perfil</strong>
        <div className="flex flex-col space-y-10 my-10">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="">Foto de perfil</Label>
            <Avatar className="cursor-pointer w-32 h-32">
              <AvatarImage src={user.avatar_url} className="object-cover" />
              <AvatarFallback>
                <UserRound className="h-16 w-16 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="">Nome de usuário</Label>
            <Input value={`@${user.username}`} className="p-5" disabled />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="">Email</Label>
            <Input value={user.email} className="p-5" disabled />
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
              variant="destructive"
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

const ProfilePage = withLayout(Profile, "LiveChat - Meu Perfil");

export default ProfilePage;
