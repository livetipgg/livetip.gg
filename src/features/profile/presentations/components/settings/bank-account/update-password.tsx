import { ConfirmAlert } from "@/components/confirm-alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withdrawState } from "@/features/carteira/states/atoms";
import { useGetBankAccountByUser } from "@/features/carteira/useCases/useGetBankAccountByUserUseCase";
import { useFetchBanks } from "@/hooks/use-fetch-banks";
import { cn } from "@/lib/utils";
import {
  Building,
  Building2,
  CalendarClock,
  CreditCard,
  Key,
  LoaderCircle,
  Trash,
  User,
} from "lucide-react";
import moment from "moment";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export const BankAccountBlock = () => {
  const { getBankAccountByUser, deleteBankAccount } = useGetBankAccountByUser();
  const { controller } = useRecoilValue(withdrawState);
  const { bankAccountToEdit } = controller;

  useEffect(() => {
    getBankAccountByUser();
  }, []);

  const { data: banks } = useFetchBanks();

  if (controller.loadingGetBankAccount) {
    return <div>Carregando...</div>;
  }

  if (!bankAccountToEdit) {
    return (
      <div>
        Conta bancária não encontrada, para cadastrar acesse o menu de saque.
      </div>
    );
  }

  const statusFormatter = (status: string) => {
    switch (status) {
      case "UNDER_REVIEW":
        return "Pendente";
      case "APPROVED":
        return "Aprovado";
      case "REJECTED":
        return "Rejeitado";
      default:
        return status;
    }
  };

  return (
    <div>
      <Card className="w-full max-w-md bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 relative">
        <div className="absolute top-4 right-4">
          <ConfirmAlert
            title="Excluir Conta Bancária"
            description="Deseja realmente excluir esta conta bancária? Você não poderá realizar saques até cadastrar outra conta."
            onConfirm={() => {
              deleteBankAccount(bankAccountToEdit.accountId);
            }}
          >
            <Button
              variant="link"
              size="icon"
              disabled={controller.loadingDeleteBankAccount}
            >
              {controller.loadingDeleteBankAccount ? (
                <LoaderCircle className="h-5 w-5 text-slate-500 animate-spin" />
              ) : (
                <Trash className="h-5 w-5 text-slate-500" />
              )}
            </Button>
          </ConfirmAlert>
        </div>

        <CardHeader className="pb-2"></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 text-slate-500" />
              <div className="grid gap-0.5">
                <span className="text-slate-600 font-medium">
                  {bankAccountToEdit.fullName}
                </span>
                <span className="text-slate-500">
                  CPF: {bankAccountToEdit.cpf}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Building2 className="h-4 w-4 text-slate-500" />
              <div className="grid gap-0.5">
                <span className="text-slate-600 font-medium">
                  Conta: {bankAccountToEdit.accountNumber}
                </span>
                <span className="text-slate-500">
                  Agência: {bankAccountToEdit.agencyNumber}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Key className="h-4 w-4 text-slate-500" />
              <div className="grid gap-0.5">
                <span className="text-slate-600 font-medium">Chave Pix</span>
                <span className="text-slate-500">
                  {bankAccountToEdit.pixKey}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <CalendarClock className="h-4 w-4 text-slate-500" />
              <div className="grid gap-0.5">
                <span className="text-slate-600 font-medium">
                  Data de Criação
                </span>
                <span className="text-slate-500">
                  {moment(new Date(bankAccountToEdit.createdAt)).format(
                    "DD/MM/YYYY"
                  )}
                </span>
              </div>
            </div>
            {banks && (
              <div className="flex items-center gap-3 text-sm">
                <Building className="h-4 w-4 text-slate-500" />
                <div className="grid gap-0.5">
                  <span className="text-slate-600 font-medium">Banco</span>
                  <span className="text-slate-500">
                    {
                      banks.find((bank) => bank.id === bankAccountToEdit.bankId)
                        ?.long_name
                    }
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Status</span>
              <span
                className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ",

                  bankAccountToEdit.status === "APPROVED"
                    ? "bg-green-100 text-green-800"
                    : bankAccountToEdit.status === "REJECTED"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                )}
              >
                {statusFormatter(bankAccountToEdit.status)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
