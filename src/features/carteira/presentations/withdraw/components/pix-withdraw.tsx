import { WarningAlert } from "@/components/warning-alert";
import { authState } from "@/features/auth/states/atoms";
import { CheckIcon, Clipboard, Clock, X } from "lucide-react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { AddBankAccountDialog } from "./add-bank-account-dialog";
import { cn } from "@/lib/utils";
import { CreateBankAccountStepHeader } from "./create-bank-account-step-header";

export const PixWithdraw = () => {
  const { user } = useRecoilValue(authState);
  const [bankAccountStatus] = useState<"pending" | "failed" | "sucsess" | null>(
    null
  );

  const canWithdrawPix = user.emailVerifiedAt;

  const hasBankAccount = false;

  const steps = [
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
  ];

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

      {canWithdrawPix && !hasBankAccount && bankAccountStatus === "pending" && (
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

      {/* 
      {canWithdrawPix && !hasBankAccount && bankAccountStatus === "failed" && (
        <div>
          <span className="text-danger text-2xl font-bold flex items-center gap-2">
            <X />
            Conta reprovada
          </span>
          <p className="text-foreground mt-2">
            Sua conta foi reprovada. Por favor, verifique os dados e tente
            novamente.
          </p>
          <div className="mt-10">Conta do cara aqui em baixo</div>
        </div>
      )}

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
