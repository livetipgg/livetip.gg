import { SectionCard } from "@/components/section-card";
import { SectionTitle } from "@/components/section-title";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { withLayout } from "@/HOC/withLayout";

const Admin = () => {
  return (
    <div className="max-w-xl ">
      <SectionCard>
        <strong>Criar Usuário</strong>
        <span className="my-10 text-muted-foreground">
          Clique no botão para criar um novo usuário informando o usuario e
          senha para acesso.
        </span>
        <div className="mw-fit">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="secondary">Criar Novo Usuário</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Criar Novo Usuário</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2 mt-5">
                  <Label className="text-xs" htmlFor="">
                    Usuário
                  </Label>
                  <Input
                    className="bg-card-custom"
                    placeholder="Digite o nome do usuário"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label className="text-xs" htmlFor="">
                    Senha
                  </Label>
                  <Input
                    className="bg-card-custom"
                    placeholder="Digite a senha do usuário"
                  />
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>Confirmar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </SectionCard>
    </div>
  );
};

const AdminPage = withLayout(Admin, "LiveTip - Painel Admin");
export default AdminPage;
