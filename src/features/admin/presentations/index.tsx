import { SectionCard } from "@/components/section-card";

import { withLayout } from "@/HOC/withLayout";

import { CreateUserDialog } from "./components/create-user-dialog";
import { VirtualWithdrawDialog } from "./components/saque-virtual-dialog";

const Admin = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3   auto-rows-max gap-2 lg:gap-5 flex-1">
      <SectionCard
        title="Criar Usuário"
        description={
          " Clique no botão para criar um novo usuário informando o usuario esenha para acesso."
        }
      >
        <CreateUserDialog />
      </SectionCard>
      <SectionCard
        title="Saque Virtual"
        description="  Clique no botão para criar efetuar um saque virtual de algum usuário."
      >
        <VirtualWithdrawDialog />
      </SectionCard>
    </div>
  );
};

const AdminPage = withLayout(Admin, "LiveTip - Painel Admin");
export default AdminPage;
