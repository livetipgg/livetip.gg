import { withLayout } from "@/HOC/withLayout";

const Admin = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3   auto-rows-max gap-2 lg:gap-5 flex-1"></div>
  );
};

const AdminPage = withLayout(Admin, "LiveTip - Painel Admin");
export default AdminPage;
