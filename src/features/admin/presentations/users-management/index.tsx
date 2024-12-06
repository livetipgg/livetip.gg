import { DataTable } from "@/components/ui/data-table";
import { withLayout } from "@/HOC/withLayout";
import { usersColumn } from "../components/table-columns";
import { useAdminGetAllUsersUseCase } from "../../useCases/useAdminGetAllUsersUseCase";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adminState } from "../../state/atoms";
import PaginationComponent from "@/components/pagination";
import { CreateUserDialog } from "../components/create-user-dialog";
import { useQuery } from "@tanstack/react-query";
import { GlobalLoader } from "@/components/global-loader";

const UsersManagement = () => {
  const { getAllUsers } = useAdminGetAllUsersUseCase();
  const { controller } = useRecoilValue(adminState);
  const { getAllUsersParams } = controller;
  const { page } = getAllUsersParams;
  const setAdminState = useSetRecoilState(adminState);

  const { isPending, data } = useQuery({
    queryKey: ["admin_users", page],
    queryFn: () =>
      getAllUsers({
        limit: 10,
        page,
      }),
  });

  if (isPending) {
    return <GlobalLoader />;
  }
  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <CreateUserDialog />
      </div>
      <DataTable columns={usersColumn} data={data.results} />
      <PaginationComponent
        currentPage={getAllUsersParams.page}
        totalPages={data.totalPages}
        total={data.count}
        onPageChange={(page) => {
          setAdminState((prevState) => ({
            ...prevState,
            controller: {
              ...prevState.controller,
              getAllUsersParams: {
                ...prevState.controller.getAllUsersParams,
                page,
              },
            },
          }));

          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
};

const UsersManagementPage = withLayout(
  UsersManagement,
  "LiveTip - Painel Admin"
);
export default UsersManagementPage;
