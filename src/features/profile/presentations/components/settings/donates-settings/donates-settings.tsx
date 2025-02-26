import InputMoney from "@/components/input-currency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authState } from "@/features/auth/states/atoms";
import { useProfileGetUserInfoUseCase } from "@/features/profile/useCases/useProfileGetUserInfoUseCase";
import { useUpdateProfileAccount } from "@/features/profile/useCases/useUpdateProfileUseCase";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export const DonatesSettingsBlock = () => {
  const { user } = useRecoilValue(authState);
  const { updateProfile } = useUpdateProfileAccount();
  const { getUserInfo } = useProfileGetUserInfoUseCase();

  const brlMinimumDonation = 1; // Valor mínimo de doação em PIX
  const satsMinimumDonation = 300; // Valor mínimo de doação em SATS

  const [brlValue, setBrlValue] = useState(user.brlMinimumDonation);
  const [satsValue, setSatsValue] = useState(user.btcMinimumDonation);

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleSaveBrl = () => {
    if (parseFloat(brlValue) >= brlMinimumDonation) {
      updateProfile({ brlMinimumDonation: brlValue }, null, () => {
        getUserInfo();
      });
    }
  };

  const handleSaveSats = () => {
    if (parseFloat(satsValue) >= satsMinimumDonation) {
      updateProfile({ btcMinimumDonation: satsValue }, null, () => {
        getUserInfo();
      });
    }
  };

  return (
    <div>
      <div className="grid gap-2">
        <Label htmlFor="min-pix">Valor mínimo doação em PIX (R$)</Label>
        <small className="text-xs text-gray-500 dark:text-gray-400">
          O valor mínimo de doação em PIX é de R$ 1,00.
        </small>
        <div className="flex items-center bg-background rounded-xl border max-w-[300px] ">
          <div className="flex items-center gap-2 w-full">
            <InputMoney
              id="min-pix"
              placeholder="0.00"
              className="border-none"
              inputClassName="border-none"
              value={parseFloat(brlValue)}
              onChange={(e) => setBrlValue(e.target.value)}
            />
            <Button
              variant="link"
              size="sm"
              onClick={handleSaveBrl}
              disabled={
                parseFloat(brlValue) < brlMinimumDonation ||
                brlValue === user.brlMinimumDonation
              }
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-2 mt-10">
        <Label htmlFor="min-sats">Valor mínimo doação em SATS</Label>
        <small className="text-xs text-gray-500 dark:text-gray-400">
          O valor mínimo de doação em SATS é de 300 sats.
        </small>
        <div className="flex items-center bg-background rounded-xl border max-w-[300px] ">
          <div className="flex items-center p-3 rounded-bl-xl rounded-tl-xl bg-[#f3f3f3] dark:bg-[#212736] justify-center">
            <span className="text-xs font-medium">₿</span>
          </div>

          <div className="flex items-center gap-2">
            <Input
              id="min-sats"
              type="number"
              placeholder="0"
              className="border-none"
              value={satsValue}
              onChange={(e) => setSatsValue(e.target.value)}
            />
          </div>
          <Button
            variant="link"
            size="sm"
            disabled={
              parseFloat(satsValue) < satsMinimumDonation ||
              satsValue === user.btcMinimumDonation
            }
            onClick={handleSaveSats}
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};
