import { Check, Clipboard, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AddBankAccountDialog } from "./add-bank-account-dialog";
import { CreateBankAccountStepHeader } from "./create-bank-account-step-header";
import { withdrawState } from "@/features/carteira/states/atoms";
import { useGetBankAccountByUser } from "@/features/carteira/useCases/useGetBankAccountByUserUseCase";
import { Label } from "@/components/ui/label";
import InputMoney from "@/components/input-currency";
import { ConfirmEmailDialog } from "./confirm-email-dialog";
import { useWithdrawUseCase } from "@/features/carteira/useCases/useWithdrawBtcUseCase";
import { Button } from "@/components/ui/button";
import { GlobalLoader } from "@/components/global-loader";
import { useFetchBanks } from "@/hooks/use-fetch-banks";
import { ErrorAlert } from "@/components/error-alert";
import { WarningAlert } from "@/components/warning-alert";

export const PixWithdraw = () => {
  // const { user } = useRecoilValue(authState);
  const { getBankAccountByUser } = useGetBankAccountByUser();
  const [withdraw] = useRecoilState(withdrawState);
  const { controller } = withdraw;
  const { bankAccountStatus, bankAccountToEdit } = controller;
  const [amount, setAmount] = useState("0");
  const { withdraw: sendWithdraw } = useWithdrawUseCase();

  // const canWithdrawPix = user.emailVerifiedAt;

  const hasBankAccount = false;

  useEffect(() => {
    getBankAccountByUser();

    setSteps((prev) =>
      prev.map((step) => {
        if (!bankAccountStatus) return step;
        if (bankAccountStatus === "APPROVED") {
          setSteps((prev) =>
            prev.map((step) => {
              if (step.id === 1) {
                return {
                  ...step,
                  status: "done",
                };
              }
              if (step.id === 2) {
                return {
                  ...step,
                  status: "done",
                };
              }
              if (step.id === 3) {
                return {
                  ...step,
                  status: "active",
                };
              }
              return step;
            })
          );
        }
        if (
          bankAccountStatus === "UNDER_REVIEW" ||
          bankAccountStatus === "REJECTED"
        ) {
          setSteps((prev) =>
            prev.map((step) => {
              if (step.id === 1) {
                return {
                  ...step,
                  status: "done",
                };
              }
              if (step.id === 2) {
                return {
                  ...step,
                  status: "active",
                };
              }
              return step;
            })
          );
        }
        return step;
      })
    );
  }, [bankAccountStatus]);

  const [steps, setSteps] = useState([
    {
      id: 1,
      name: "Cadastro",
      icon: Clipboard,
      description:
        "Você precisa ter uma conta bancária cadastrada para realizar saques pix.",
      status: "active",
    },
    {
      id: 2,
      name: "Analise",
      icon: Clock,
      description:
        "Sua conta está em análise. Assim que a análise for concluída você poderá realizar saques pix.",
      status: "upcoming",
    },
    {
      id: 3,
      name: "Concluído",
      icon: Check,
      description: "Você pode realizar saques pix.",
      status: "approved",
    },
  ]);

  const { isLoading, data: banks } = useFetchBanks();

  return (
    <div>
      {/* Steps */}
      {(isLoading ||
        controller.loadingGetBankAccount ||
        controller.loadingCreateBankAccount) && <GlobalLoader />}

      <CreateBankAccountStepHeader steps={steps} />

      {!hasBankAccount && bankAccountStatus === null && (
        <div className="flex flex-col gap-2 mt-10">
          <div className="flex flex-col gap-1 mb-4">
            <span className="text-sm text-muted-foreground font-medium">
              Passo 1
            </span>
            <h2 className="text-2xl font-medium">
              Cadastre uma conta bancária
            </h2>
            <hr className="mt-2" />
          </div>
          <AddBankAccountDialog />
        </div>
      )}

      {/* {!canWithdrawPix && (
        <WarningAlert error="Você precisa ter o email verificado para poder realizar saques pix." />
      )} */}

      {bankAccountStatus === "UNDER_REVIEW" && (
        <div className="flex flex-col gap-2 mt-10">
          <div className="flex flex-col gap-1 mb-4">
            <span className="text-sm text-muted-foreground font-medium">
              Passo 2
            </span>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-medium">
                Aguardando análise da conta
              </h2>
              <Button variant="link" onClick={getBankAccountByUser}>
                Atualizar
              </Button>
            </div>

            <hr className="mt-2" />
          </div>
          <p className="text-foreground mt-2">
            Sua conta está em análise. Assim que a análise for concluída você
            poderá realizar saques pix.
          </p>
        </div>
      )}

      {bankAccountStatus === "REJECTED" && (
        <div className="flex flex-col gap-2 mt-10">
          <div className="flex flex-col gap-1 mb-4">
            <span className="text-sm text-muted-foreground font-medium">
              Passo 2
            </span>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-medium">
                Aguardando análise da conta
              </h2>
              <Button variant="link" onClick={getBankAccountByUser}>
                Atualizar
              </Button>
            </div>
            <hr className="mt-2" />
          </div>
          <div>
            <span className="text-danger text-2xl font-bold flex items-center gap-2">
              <X />
              Conta reprovada
            </span>
            <p className="text-foreground mt-2">
              Sua conta foi reprovada. Por favor, verifique os dados e tente
              novamente.
            </p>
            {withdraw.controller.bankAccountToEdit?.reviewNote && (
              <div className="flex p-2 border border-blue-600 bg-blue-600/5 rounded-lg text-blue-600 mt-5">
                <strong className="mr-1">Motivo:</strong>{" "}
                {withdraw.controller.bankAccountToEdit?.reviewNote}
              </div>
            )}

            <div className="mt-10">
              <AddBankAccountDialog
                data={withdraw.controller.bankAccountToEdit}
              />
            </div>
          </div>
        </div>
      )}
      {bankAccountStatus === "APPROVED" && (
        <div>
          <div className="flex flex-col gap-2 mt-10">
            <div className="flex flex-col gap-1 mb-4">
              <span className="text-sm text-muted-foreground font-medium">
                Passo 3
              </span>
              <h2 className="text-2xl font-medium">Conta aprovada</h2>
              <hr className="mt-2" />
            </div>
            <p className="text-foreground mt-2">
              Sua conta foi aprovada. Agora você pode realizar saques pix.
            </p>
            <div className="flex flex-col gap-2 mt-10">
              <Label>Chave Pix</Label>
              <span className="text-2xl">
                {bankAccountToEdit?.pixKey.replace(/\.|-/g, "")}
              </span>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <Label>Tipo Chave Pix</Label>
              <span className="text-2xl">
                {bankAccountToEdit?.pixKeyType.replace(/\.|-/g, "")}
              </span>
            </div>
            {banks && controller.bankAccountToEdit && (
              <div className="flex flex-col gap-2 mt-2">
                <Label>Banco</Label>
                <span className="text-2xl">
                  {" "}
                  {
                    banks.find(
                      (bank) => bank.id === controller.bankAccountToEdit.bankId
                    )?.long_name
                  }
                </span>
              </div>
            )}
            {!!amount && Number(amount) >= 1 && (
              <WarningAlert
                error={`Temos uma taxa de R$ 0,50 para saque, para sacar o valor de R$ ${amount} você receberá R$ ${
                  (Number(amount) - 0.5).toFixed(2) || "0,00"
                }`}
              />
            )}
            <div className="flex flex-col gap-2 mt-10">
              <Label>Valor</Label>

              <InputMoney
                className="border-none"
                value={parseFloat(amount)}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            {parseFloat(amount) <= 1 && (
              <ErrorAlert error="O valor mínimo para saque é de R$ 1,00" />
            )}

            <div>
              {!!amount && Number(amount) >= 1 && (
                <ConfirmEmailDialog
                  label="Realizar Saque"
                  onSuccess={(otp: string) =>
                    sendWithdraw({
                      amount: amount.toString(),
                      currency: "BRL",
                      pixKey: bankAccountToEdit?.pixKey,
                      verificationCode: otp,
                    })
                  }
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// NOME COMPLETO
// NUMERO AGENCIA
// BANK ID
// NUMERO CONTA
// TIPO DA CHAVE PIX
// CHAVE PIX
