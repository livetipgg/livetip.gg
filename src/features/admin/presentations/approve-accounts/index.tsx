import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { withLayout } from "@/HOC/withLayout";
import { Check, Clock, X, XCircle } from "lucide-react";

const ApproveAccounts = () => {
  // const { isPending, data } = useQuery({
  //   queryKey: ["admin_users", page, getAllUsersParams.search],
  //   queryFn: () =>
  //     getAllUsers({
  //       limit: 10,
  //       page,
  //       search: getAllUsersParams.search,
  //     }),
  // });

  const data = [
    {
      id: 1,
      fullName: "João",
      email: "joao@gmail.com",
      status: "pending",
      bankInfo: {
        bank: "Banco do Brasil",
        agency: "1234",
        account: "12345-6",
      },
      cpf: "123.456.789-00",
    },
    {
      id: 2,
      fullName: "Maria",
      email: "maria@gmail.com",
      status: "pending",
      bankInfo: {
        bank: "Banco do Brasil",
        agency: "1234",
        account: "12345-6",
      },
      cpf: "123.456.789-00",
    },
    {
      id: 3,
      fullName: "José",
      email: "jose@gmail.com",
      status: "pending",
      bankInfo: {
        bank: "Banco do Brasil",
        agency: "1234",
        account: "12345-6",
      },
      cpf: "123.456.789-00",
    },
    {
      id: 4,
      fullName: "Ana",
      email: "ana@gmail.com",
      status: "pending",
      bankInfo: {
        bank: "Banco do Brasil",
        agency: "1234",
        account: "12345-6",
      },
      cpf: "123.456.789-00",
    },
    {
      id: 5,
      fullName: "Pedro",
      email: "pedro@gmail.com",
      status: "pending",
      bankInfo: {
        bank: "Banco do Brasil",
        agency: "1234",
        account: "12345-6",
      },
      cpf: "123.456.789-00",
    },
  ];

  return (
    <div>
      <Tabs defaultValue="pending" className="px-0 mx-0">
        <TabsList className="mb-5  w-full flex-col md:flex-row  bg-transparent h-fit">
          <TabsTrigger
            value="pending"
            className="flex w-full flex-1 border-b-4 p-4 gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-b-orange-400 data-[state=active]:shadow-none data-[state=active]:text-orange-400"
          >
            <Clock className="h-5 w-5" />
            <span className="text-xl">Pendentes</span>
          </TabsTrigger>

          <TabsTrigger
            value="approve"
            className="flex w-full flex-1 border-b-4 p-4 gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-b-green-400 data-[state=active]:shadow-none data-[state=active]:text-green-400"
          >
            <Check className="h-5 w-5" />
            <span className="text-xl">Aprovados</span>
          </TabsTrigger>
          <TabsTrigger
            value="failed"
            className="flex w-full flex-1 border-b-4 p-4 gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-b-red-400 data-[state=active]:shadow-none data-[state=active]:text-red-400"
          >
            <XCircle className="h-5 w-5" />
            <span className="text-xl">Reprovados</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <div className="flex  gap-2 flex-wrap">
            {data.map((user) => (
              <div
                key={user.id}
                className="flex justify-between flex-col flex-1 min-w-[320px]  p-4 bg-card-custom border rounded-lg  mb-4"
              >
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">{user.fullName}</span>
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    <span className="text-sm">
                      <span className="font-bold">CPF:</span> {user.cpf}
                    </span>
                    <span className="text-sm">
                      <span className="font-bold">Banco:</span>{" "}
                      {user.bankInfo.bank}
                    </span>
                    <span className="text-sm">
                      <span className="font-bold">Agência:</span>{" "}
                      {user.bankInfo.agency}
                    </span>
                    <span className="text-sm">
                      <span className="font-bold">Conta:</span>{" "}
                      {user.bankInfo.account}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 flex-1">
                  <Button className="bg-success font-bold gap-2 hover:bg-succes/20 flex-1">
                    <Check className="h-5 w-5" />
                    Aprovar
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-red-400 font-bold gap-2 flex-1">
                        <X className="h-5 w-5" />
                        Reprovar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reprovar conta</DialogTitle>
                        <DialogDescription>
                          Tem certeza que deseja reprovar a conta de{" "}
                          {user.fullName} ?
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        <Label>Motivo da reprovação</Label>
                        <Textarea placeholder="Digite o motivo da reprovação" />
                      </div>
                      <DialogFooter>
                        <Button variant="link" className="text-foreground">
                          Cancelar
                        </Button>
                        <Button className="bg-red-400 font-bold gap-2">
                          <X className="h-5 w-5" />
                          Reprovar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="approve"></TabsContent>
        <TabsContent value="failed"></TabsContent>
      </Tabs>
    </div>
  );
};

const ApproveAccountsPage = withLayout(
  ApproveAccounts,
  "LiveTip - Painel Admin"
);
export default ApproveAccountsPage;
