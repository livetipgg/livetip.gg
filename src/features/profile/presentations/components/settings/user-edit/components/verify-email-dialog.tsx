import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authState } from "@/features/auth/states/atoms";
import { profileState } from "@/features/profile/states/atoms";
import { useProfileGetUserInfoUseCase } from "@/features/profile/useCases/useProfileGetUserInfoUseCase";
import { useProfileVerifyEmailUseCase } from "@/features/profile/useCases/useProfileVerifyEmailUseCase";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export const VerifyEmailDialog = () => {
  const { user } = useRecoilValue(authState);
  const [otp, setOtp] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resendCodeCountdown, setResendCoderesendCodeCountdown] = useState(0);
  const { sendCodeToEmail, verifyCode } = useProfileVerifyEmailUseCase();
  const { getUserInfo } = useProfileGetUserInfoUseCase();
  const { controller } = useRecoilValue(profileState);
  const { isLoadingSendCodeToEmail, isLoadingUpdateProfile } = controller;
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCodeCountdown > 0) {
      interval = setInterval(() => {
        setResendCoderesendCodeCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [resendCodeCountdown]);

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (open) {
          sendCodeToEmail();
          setResendCoderesendCodeCountdown(60);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="link">Verificar Email</Button>
      </DialogTrigger>
      <DialogContent>
        {isLoadingSendCodeToEmail ? (
          <div className="flex items-center gap-2">
            <LoaderCircle className="animate-spin w-6 h-6" />
            <span className="font-bold">Enviando código...</span>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Verificar email</DialogTitle>
              <DialogDescription>
                Em breve um código de verificação deve ser enviado para{" "}
                <span className="text-primary font-medium">{user.email}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              <InputOTP
                pattern={REGEXP_ONLY_DIGITS}
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup className="flex-1">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                variant="link"
                disabled={resendCodeCountdown > 0}
                className="text-primary w-full gap-2"
                onClick={() => {
                  sendCodeToEmail();
                  setResendCoderesendCodeCountdown(60);
                }}
              >
                Reenviar Código
                {resendCodeCountdown > 0 && (
                  <span>({resendCodeCountdown}s)</span>
                )}
              </Button>

              <Button
                className="p-6 rounded-xl mt-4 hover:bg-secondary flex-1 w-full"
                disabled={otp.length < 6 || isLoadingUpdateProfile}
                onClick={() =>
                  verifyCode(
                    otp,
                    () => {
                      setOtp("");
                      setDialogOpen(false);
                      getUserInfo();
                    },
                    () => {
                      setOtp("");
                    }
                  )
                }
              >
                {isLoadingUpdateProfile ? "Verificando..." : "Confirmar"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
