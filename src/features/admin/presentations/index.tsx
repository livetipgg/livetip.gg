import { SectionCard } from "@/components/section-card";
import { SectionTitle } from "@/components/section-title";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { withLayout } from "@/HOC/withLayout";

const Admin = () => {
  return (
    <div className="max-w-xl ">
      <SectionTitle title="Painel Admin" />
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
              <div>
                <strong>Novo Usuário</strong>
                <div className="flex flex-col space-y-8">
                  <div className="flex flex-col space-y-2 mt-5">
                    <Label htmlFor="">Usuário</Label>
                    <Input className="p-5" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="">Senha</Label>
                    <Input className="p-5" />
                  </div>
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
