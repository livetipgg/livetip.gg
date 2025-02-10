import { Check, Clipboard, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AddBankAccountDialog } from "./add-bank-account-dialog";
import { CreateBankAccountStepHeader } from "./create-bank-account-step-header";
import { withdrawState } from "@/features/carteira/states/atoms";
import { useGetBankAccountByUser } from "@/features/carteira/useCases/usegetBankAccountByUser";

export const PixWithdraw = () => {
  // const { user } = useRecoilValue(authState);
  const { getBankAccountByUser } = useGetBankAccountByUser();
  const [withdraw] = useRecoilState(withdrawState);
  const { controller } = withdraw;
  const { bankAccountStatus } = controller;

  // const canWithdrawPix = user.emailVerifiedAt;

  const hasBankAccount = false;

  useEffect(() => {
    getBankAccountByUser();
    console.log("Bank account status useeffect", bankAccountStatus);

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

  return (
    <div>
      {/* Steps */}
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
            <h2 className="text-2xl font-medium">
              Aguardando análise da conta
            </h2>

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
            <h2 className="text-2xl font-medium">
              Aguardando análise da conta
            </h2>
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
      {bankAccountStatus === "APPROVED" && <div>sacar</div>}
      {/* 
      {!hasBankAccount && bankAccountStatus === null && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-2xl font-bold">Cadastre uma conta bancária</h2>
            <span className="text-foreground">
              Você precisa ter uma conta bancária cadastrada para realizar
              saques pix.
            </span>
          </div>
          <AddBankAccountDialog />
        </div>
      )}

      {canWithdrawPix && hasBankAccount && <div>Realizar saque</div>} */}
    </div>
  );
};

// NOME COMPLETO
// NUMERO AGENCIA
// BANK ID
// NUMERO CONTA
// TIPO DA CHAVE PIX
// CHAVE PIX
