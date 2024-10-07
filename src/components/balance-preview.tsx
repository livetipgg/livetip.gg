import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import pixLogo from "@/assets/pix-logo.png";
import bitcoinLogo from "@/assets/bitcoin-logo.png";
import { useRecoilValue } from "recoil";
import { authState } from "@/features/auth/states/atoms";
import { formatCurrencyValue } from "@/helpers/formatCurrencyValue";
import { balanceState } from "@/features/balance/states/atoms";
import { useSetShowCurrentBalanceUseCase } from "@/features/balance/useCases/useSetShowCurrentBalanceUseCase";

export const BalancePreview: React.FC = () => {
  const { controller } = useRecoilValue(balanceState);
  const { showCurrentBalance } = controller;
  const { setShowCurrentBalance } = useSetShowCurrentBalanceUseCase();
  const { user } = useRecoilValue(authState);
  const { brl_balance, btc_balance } = user;
  return (
    <div className="   hidden md:flex gap-2 items-center">
      <div className="flex items-center gap-2 border border-input rounded-lg pe-2">
        <div className="bg-background p-2 rounded-lg">
          <img src={pixLogo} alt="pix" className="w-5 h-5" />
        </div>
        <span className="text-foreground text-sm font-bold">
          {showCurrentBalance ? (
            formatCurrencyValue(brl_balance)
          ) : (
            <div className="blur-md">{formatCurrencyValue(brl_balance)}</div>
          )}
        </span>
      </div>
      <div className="flex items-center gap-2 border border-input rounded-lg pe-2">
        <div className="bg-background p-2 rounded-lg">
          <img src={bitcoinLogo} alt="pix" className="w-5 h-5" />
        </div>
        <span className="text-foreground text-sm font-bold">
          {showCurrentBalance ? (
            btc_balance + " BTC"
          ) : (
            <div className="blur-md">{btc_balance} BTC</div>
          )}
        </span>
      </div>
      <Button
        size="icon"
        variant={"ghost"}
        className="w-5 h-5"
        onClick={() => setShowCurrentBalance(!showCurrentBalance)}
      >
        {showCurrentBalance ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
};
