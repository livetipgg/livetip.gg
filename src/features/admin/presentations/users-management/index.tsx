import { DataTable } from "@/components/ui/data-table";
import { withLayout } from "@/HOC/withLayout";
import { useState } from "react";
import { usersColumn } from "../components/table-columns";
import PaginationComponent from "@/components/pagination";
import { CreateUserDialog } from "../components/create-user-dialog";
import { Input } from "@/components/ui/input";
import { GlobalLoader } from "@/components/global-loader";
import { useQuery } from "@tanstack/react-query";
import { useAdminGetAllUsersUseCase } from "../../useCases/useAdminGetAllUsersUseCase";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adminState } from "../../state/atoms";

const UsersManagement = () => {
  const { getAllUsers } = useAdminGetAllUsersUseCase();
  const { controller } = useRecoilValue(adminState);
  const { getAllUsersParams } = controller;
  const { page } = getAllUsersParams;
  const setAdminState = useSetRecoilState(adminState);

  const [searchValue, setSearchValue] = useState("");

  const { isPending, data } = useQuery({
    queryKey: ["admin_users", page, getAllUsersParams.search],
    queryFn: () =>
      getAllUsers({
        limit: 10,
        page,
        search: getAllUsersParams.search,
      }),
  });

  const handleSearch = () => {
    setAdminState((prevState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        getAllUsersParams: {
          ...prevState.controller.getAllUsersParams,
          search: searchValue,
          page: 1, // Reinicia a paginação
        },
      },
    }));
  };

  if (isPending) {
    return <GlobalLoader />;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Input
          className="max-w-[300px] shadow-none border-muted-foreground/40 rounded-lg"
          placeholder="Pesquise pelo nome, email ou username..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // Chama a função de busca ao pressionar "Enter"
            }
          }}
        />
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
