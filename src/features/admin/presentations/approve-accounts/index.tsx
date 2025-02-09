import { NoContent } from "@/components/no-content";
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
import { useAdminGetBankAccounts } from "../../useCases/useAdminGetBankAccounts";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { adminState } from "../../state/atoms";
import { GlobalLoader } from "@/components/global-loader";
import { useAdminToggleBankAccountStatus } from "../../useCases/useAdminToggleBankAccountStatus";
import { useFetchBanks } from "@/hooks/use-fetch-banks";

const ApproveAccounts = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [motivo, setMotivo] = useState("");
  const {
    getPendingBankAccounts,
    getApprovedBankAccounts,
    getRejectedBankAccounts,
  } = useAdminGetBankAccounts();
  const { pendingAccounts, approvedAccounts, rejectedAccounts, controller } =
    useRecoilValue(adminState);
  const { isLoadingToggleBankAccountStatus } = controller;
  const { approveBankAccount, rejectBankAccount } =
    useAdminToggleBankAccountStatus();

  useEffect(() => {
    getPendingBankAccounts();
    getApprovedBankAccounts();
    getRejectedBankAccounts();
  }, []);
  const { data: banks } = useFetchBanks();

  return (
    <div>
      {controller.isLoadingBankAccountsList ||
        (isLoadingToggleBankAccountStatus && <GlobalLoader />)}
      <div className="flex justify-end">
        <Button
          onClick={() => {
            getPendingBankAccounts();
            getApprovedBankAccounts();
            getRejectedBankAccounts();
          }}
        >
          Atualizar
        </Button>
      </div>
      <Tabs defaultValue="pending" className="px-0 mx-0">
        <TabsList className="mb-5  w-full flex-col md:flex-row  bg-transparent h-fit">
          <TabsTrigger
            value="pending"
            className="flex w-full flex-1 border-b-4 p-4 gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-b-orange-400 data-[state=active]:shadow-none data-[state=active]:text-orange-400"
          >
            <Clock className="h-5 w-5" />
            <span className="text-xl">Pendentes</span>
            <span className="data-[state=active]:text-orange-400  font-bold data-[state=active]:border-orange-400 data-[state=active]:bg-orange-400/20  w-6 h-6 flex items-center justify-center rounded-full ">
              {pendingAccounts.count}
            </span>
          </TabsTrigger>

          <TabsTrigger
            value="approve"
            className="flex w-full flex-1 border-b-4 p-4 gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-b-green-400 data-[state=active]:shadow-none data-[state=active]:text-green-400"
          >
            <Check className="h-5 w-5" />
            <span className="text-xl">Aprovados</span>
            <span className="data-[state=active]:text-green-400   font-bold data-[state=active]:border-green-400 data-[state=active]:bg-green-400/20  w-6 h-6 flex items-center justify-center rounded-full ">
              {approvedAccounts.count}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="failed"
            className="flex w-full flex-1 border-b-4 p-4 gap-2 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-b-red-400 data-[state=active]:shadow-none data-[state=active]:text-red-400"
          >
            <XCircle className="h-5 w-5" />
            <span className="text-xl">Reprovados</span>
            <span className="data-[state=active]:text-red-400  font-bold data-[state=active]:border-red-400 data-[state=active]:bg-red-400/20  w-6 h-6 flex items-center justify-center rounded-full ">
              {rejectedAccounts.count}
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <div className="flex  gap-2 flex-wrap">
            {pendingAccounts.results.map((user) => (
              <div
                key={user.id}
                className="flex justify-between flex-col flex-1 min-w-[320px]  p-4 bg-card-custom border rounded-lg  mb-4"
              >
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">{user.fullName}</span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    <span className="text-sm">
                      <span className="font-bold">CPF:</span> {user.cpf}
                    </span>
                    <span className="text-sm">
                      <span className="font-bold">Chave Pix:</span>{" "}
                      {user.pixKey}
                    </span>
                    <span className="text-sm">
                      <span className="font-bold">Tipo Chave Pix:</span>{" "}
                      {user.pixKeyType}
                    </span>
                    {banks && (
                      <span className="text-sm">
                        <span className="font-bold">Banco:</span>{" "}
                        {
                          banks.find((bank) => bank.id === user.bankId)
                            ?.long_name
                        }
                      </span>
                    )}

                    <span className="text-sm">
                      <span className="font-bold">Agência:</span>{" "}
                      {user.agencyNumber}
                    </span>
                    <span className="text-sm">
                      <span className="font-bold">Conta:</span>{" "}
                      {user.accountNumber}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 flex-1">
                  <Button
                    className="bg-success font-bold gap-2 hover:bg-succes/20 flex-1"
                    onClick={() => approveBankAccount(user.accountId)}
                  >
                    <Check className="h-5 w-5" />
                    Aprovar
                  </Button>
                  <Dialog
                    open={dialogOpen}
                    onOpenChange={(isOpen) => setDialogOpen(isOpen)}
                  >
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
                        <Textarea
                          placeholder="Digite o motivo da reprovação"
                          value={motivo}
                          onChange={(e) => setMotivo(e.target.value)}
                        />
                      </div>
                      <DialogFooter>
                        <Button variant="link" className="text-foreground">
                          Cancelar
                        </Button>
                        <Button
                          className="bg-red-400 font-bold gap-2"
                          onClick={() => {
                            rejectBankAccount(user.accountId, motivo);
                            setDialogOpen(false);
                          }}
                        >
                          {isLoadingToggleBankAccountStatus ? (
                            "Reprovando..."
                          ) : (
                            <>
                              <X className="h-5 w-5" />
                              Reprovar
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="approve">
          {!approvedAccounts.results.length && (
            <NoContent message="Nenhum usuário aprovado" />
          )}
          {approvedAccounts.results.map((user) => (
            <div
              key={user.id}
              className="flex justify-between flex-col flex-1 min-w-[320px]  p-4 bg-card-custom border rounded-lg  mb-4"
            >
              <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">{user.fullName}</span>
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <span className="text-sm">
                    <span className="font-bold">CPF:</span> {user.cpf}
                  </span>
                  <span className="text-sm">
                    <span className="font-bold">Banco:</span> {user.bankId}
                  </span>
                  <span className="text-sm">
                    <span className="font-bold">Agência:</span>{" "}
                    {user.agencyNumber}
                  </span>
                  <span className="text-sm">
                    <span className="font-bold">Conta:</span>{" "}
                    {user.accountNumber}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="failed">
          {!rejectedAccounts.results.length && (
            <NoContent message="Nenhum usuário reprovado" />
          )}

          {rejectedAccounts.results.map((user) => (
            <div
              key={user.id}
              className="flex justify-between flex-col flex-1 min-w-[320px]  p-4 bg-card-custom border rounded-lg  mb-4"
            >
              <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">{user.fullName}</span>
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <span className="text-sm">
                    <span className="font-bold">CPF:</span> {user.cpf}
                  </span>
                  <span className="text-sm">
                    <span className="font-bold">Banco:</span> {user.bankId}
                  </span>
                  <span className="text-sm">
                    <span className="font-bold">Agência:</span>{" "}
                    {user.agencyNumber}
                  </span>
                  <span className="text-sm">
                    <span className="font-bold">Conta:</span>{" "}
                    {user.accountNumber}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 flex-1">
                <Button
                  className="bg-success font-bold gap-2 hover:bg-succes/20 flex-1"
                  onClick={() => approveBankAccount(user.accountId)}
                >
                  <Check className="h-5 w-5" />
                  Aprovar
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ApproveAccountsPage = withLayout(
  ApproveAccounts,
  "LiveTip - Painel Admin"
);
export default ApproveAccountsPage;
