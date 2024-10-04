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
import { LoaderCircle } from "lucide-react";
const Profile = () => {
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
              <AvatarImage
                src="https://musicaecinema.com/wp-content/uploads/2024/02/the-office-how-to-watch.jpg"
                className="object-cover"
              />
              <AvatarFallback>EM</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="">Nome de usuário</Label>
            <Input value="@usuarioteste" className="p-5" disabled />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="">Email</Label>
            <Input value="emailteste@gmail.com" className="p-5" disabled />
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
            onConfirm={() => {
              handleCancelAccount();
              console.log("Conta encerrada");
            }}
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
