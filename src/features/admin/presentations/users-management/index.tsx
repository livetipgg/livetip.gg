import { DataTable } from "@/components/ui/data-table";
import { withLayout } from "@/HOC/withLayout";
import { usersColumn } from "../components/table-columns";
import { useAdminGetAllUsersUseCase } from "../../useCases/useAdminGetAllUsersUseCase";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adminState } from "../../state/atoms";
import PaginationComponent from "@/components/pagination";

const UsersManagement = () => {
  const { getAllUsers } = useAdminGetAllUsersUseCase();
  const { users, controller } = useRecoilValue(adminState);
  const { getAllUsersParams } = controller;
  const { page } = getAllUsersParams;
  const setAdminState = useSetRecoilState(adminState);
  useEffect(() => {
    getAllUsers({
      limit: 10,
      page,
    });
  }, []);

  return (
    <div>
      <DataTable columns={usersColumn} data={users.results} />
      <PaginationComponent
        currentPage={getAllUsersParams.page}
        totalPages={users.totalPages}
        total={users.count}
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
          getAllUsers({
            page,
            limit: 10,
          });

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
