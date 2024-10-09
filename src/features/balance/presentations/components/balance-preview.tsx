import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import pixLogo from "@/assets/pix-logo.png";
import bitcoinLogo from "@/assets/bitcoin-logo.png";
import { useRecoilValue } from "recoil";
import { authState } from "@/features/auth/states/atoms";
import { formatCurrencyValue } from "@/helpers/formatCurrencyValue";
import { balanceState } from "@/features/balance/states/atoms";
import { useSetShowCurrentBalanceUseCase } from "@/features/balance/useCases/useSetShowCurrentBalanceUseCase";
import { Skeleton } from "../../../../components/ui/skeleton";

const BalanceItem: React.FC<{
  logo: string;
  altText: string;
  balance: string | number;
  isLoading: boolean;
  showCurrentBalance: boolean;
  unit?: string;
}> = ({ logo, altText, balance, isLoading, showCurrentBalance, unit }) => {
  return (
    <div className="flex items-center gap-2 border border-input rounded-lg pe-2">
      <div className="bg-background p-2 rounded-lg">
        <img src={logo} alt={altText} className="w-5 h-5" />
      </div>
      <span className="text-foreground text-sm font-bold">
        {showCurrentBalance ? (
          !isLoading ? (
            <>
              {balance}
              {unit && unit}
            </>
          ) : (
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
          )
        ) : (
          <div className="blur-sm">
            {balance}
            {unit && unit}
          </div>
        )}
      </span>
    </div>
  );
};

// Componente BalanceToggleButton
const BalanceToggleButton: React.FC<{
  showCurrentBalance: boolean;
  toggleShowCurrentBalance: () => void;
}> = ({ showCurrentBalance, toggleShowCurrentBalance }) => (
  <Button
    size="icon"
    variant={"ghost"}
    className="w-5 h-5"
    onClick={toggleShowCurrentBalance}
  >
    {showCurrentBalance ? <EyeOff /> : <Eye />}
  </Button>
);

// Componente principal BalancePreview
export const BalancePreview: React.FC = () => {
  const { controller } = useRecoilValue(balanceState);
  const { showCurrentBalance, isLoading } = controller;
  const { setShowCurrentBalance } = useSetShowCurrentBalanceUseCase();
  const { user } = useRecoilValue(authState);
  const { brl_balance, btc_balance } = user;

  return (
    <div className="hidden md:flex gap-2 items-center">
      <BalanceItem
        logo={pixLogo}
        altText="pix"
        balance={formatCurrencyValue(brl_balance)}
        isLoading={isLoading}
        showCurrentBalance={showCurrentBalance}
      />
      <BalanceItem
        logo={bitcoinLogo}
        altText="bitcoin"
        balance={btc_balance}
        isLoading={isLoading}
        showCurrentBalance={showCurrentBalance}
        unit=" BTC"
      />
      {!isLoading && (
        <BalanceToggleButton
          showCurrentBalance={showCurrentBalance}
          toggleShowCurrentBalance={() =>
            setShowCurrentBalance(!showCurrentBalance)
          }
        />
      )}
    </div>
  );
};

export const BalanceMobilePreview: React.FC = () => {
  const { controller } = useRecoilValue(balanceState);
  const { showCurrentBalance, isLoading } = controller;
  const { setShowCurrentBalance } = useSetShowCurrentBalanceUseCase();
  const { user } = useRecoilValue(authState);
  const { brl_balance, btc_balance } = user;

  return (
    <div className="flex gap-2 flex-col items-center">
      <div className="flex items-center gap-2 border border-input rounded-lg pe-2 w-full">
        <div className="bg-background p-2 rounded-lg">
          <img src={pixLogo} alt="pix" className="w-5 h-5" />
        </div>
        <span className="text-foreground text-sm font-bold">
          {showCurrentBalance ? (
            <>
              {!isLoading && formatCurrencyValue(brl_balance)}
              {isLoading && (
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              )}
            </>
          ) : (
            <div className="blur-sm">{formatCurrencyValue(brl_balance)}</div>
          )}
        </span>
      </div>
      <div className="flex items-center gap-2 border border-input rounded-lg pe-2 w-full">
        <div className="bg-background p-2 rounded-lg">
          <img src={bitcoinLogo} alt="pix" className="w-5 h-5" />
        </div>
        <span className="text-foreground text-sm font-bold">
          {showCurrentBalance ? (
            <>
              {!isLoading && btc_balance + " BTC"}
              {isLoading && (
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              )}
            </>
          ) : (
            <div className="blur-sm">{btc_balance} BTC</div>
          )}
        </span>
      </div>
      {!isLoading && (
        <Button
          size="icon"
          variant={"ghost"}
          className="w-5 h-5"
          onClick={() => setShowCurrentBalance(!showCurrentBalance)}
        >
          {showCurrentBalance ? <EyeOff /> : <Eye />}
        </Button>
      )}
    </div>
  );
};
