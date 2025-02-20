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

  const brlMinimumDonation = user.brlMinimumDonation;
  const satsMinimumDonation = user.btcMinimumDonation;

  const [brlValue, setBrlValue] = useState(brlMinimumDonation);
  const [satsValue, setSatsValue] = useState(satsMinimumDonation);

  useEffect(() => {
    getUserInfo();
  }, []);

  console.log(user);
  return (
    <div>
      <div className="grid gap-2">
        <Label htmlFor="min-pix">Valor mínimo doação em PIX (R$)</Label>
        <div className="flex items-center bg-background rounded-xl border max-w-[300px] ">
          <div className="flex items-center gap-2 w-full">
            <InputMoney
              id="min-pix"
              placeholder="0.00"
              className="border-none  "
              inputClassName="border-none"
              value={parseFloat(brlValue)}
              onChange={(e) => setBrlValue(e.target.value)}
            />
            <Button
              variant="link"
              size="sm"
              onClick={() =>
                updateProfile({ brlMinimumDonation: brlValue }, null, () => {
                  getUserInfo();
                })
              }
              disabled={brlValue === brlMinimumDonation}
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
      <div className="grid gap-2 mt-10">
        <Label htmlFor="min-pix">Valor mínimo doação em SATS</Label>
        <div className="flex items-center bg-background rounded-xl border max-w-[300px] ">
          <div className=" flex  items-center p-3 rounded-bl-xl rounded-tl-xl   bg-[#f3f3f3] dark:bg-[#212736] justify-center ">
            <span className="text-xs font-medium  ">₿</span>
          </div>

          <div className="flex items-center gap-2">
            <Input
              id="min-pix"
              type="number"
              placeholder="0"
              className=" border-none"
              value={satsValue}
              onChange={(e) => setSatsValue(e.target.value)}
            />
          </div>
          <Button
            variant="link"
            size="sm"
            disabled={satsValue === satsMinimumDonation}
            onClick={() =>
              updateProfile({ btcMinimumDonation: satsValue }, null, () => {
                getUserInfo();
              })
            }
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};
