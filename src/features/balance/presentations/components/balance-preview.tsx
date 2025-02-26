import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import pixLogo from "@/assets/pix-logo.png";
import bitcoinLogo from "@/assets/bitcoin-logo.png";
import { useRecoilValue } from "recoil";
import { authState } from "@/features/auth/states/atoms";
import { formatCurrencyValue } from "@/helpers/formatCurrencyValue";
import { balanceState } from "@/features/balance/states/atoms";
import { useSetShowCurrentBalanceUseCase } from "@/features/balance/useCases/useSetShowCurrentBalanceUseCase";
import { Skeleton } from "../../../../components/ui/skeleton";
import { useGetUserBalancesUseCase } from "../../useCases/useGetUserBalancesUseCase";

const BalanceItem: React.FC<{
  logo?: string;
  altText: string;
  balance: string | number;
  isLoading: boolean;
  showCurrentBalance: boolean;
  unit?: string;
  customLogo?: React.ReactNode;
}> = ({
  logo,
  altText,
  balance,
  isLoading,
  showCurrentBalance,
  unit,
  customLogo,
}) => {
  return (
    <div className="flex items-center gap-2 border border-input rounded-lg pe-2">
      <div className="bg-background p-2 rounded-lg">
        {customLogo && customLogo}
        {!customLogo && <img src={logo} alt={altText} className="w-5 h-5" />}
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
  <Button size="icon" variant={"link"} onClick={toggleShowCurrentBalance}>
    {showCurrentBalance ? (
      <EyeOff className="w-4 h-4" />
    ) : (
      <Eye className="w-4 h-4" />
    )}
  </Button>
);
const BalanceLoadBalance = () => {
  const { controller: balanceStateController } = useRecoilValue(balanceState);
  const { isLoading: balanceIsLoading } = balanceStateController;
  const { loadUserBalance } = useGetUserBalancesUseCase();

  return (
    <Button
      size={"icon"}
      variant={"link"}
      className={` ${balanceIsLoading ? "text-muted-foreground" : ""}`}
      title="Atualizar"
      onClick={loadUserBalance}
      disabled={balanceIsLoading}
    >
      <RefreshCw
        className={`w-4 h-4 mb-0 ${balanceIsLoading ? "animate-spin" : ""}`}
      />
    </Button>
  );
};
// Componente principal BalancePreview
export const BalancePreview: React.FC = () => {
  const { controller } = useRecoilValue(balanceState);
  const { showCurrentBalance, isLoading } = controller;
  const { setShowCurrentBalance } = useSetShowCurrentBalanceUseCase();
  const { user } = useRecoilValue(authState);
  const { brlBalance, btcBalance } = user;
  return (
    <div className="flex gap-2 flex-col items-stretch w-full ">
      <div className="px-1 flex items-center justify-between">
        <span className="font-xs font-medium ">Saldo</span>
        <div className="flex items-center gap-1">
          {!isLoading && (
            <BalanceToggleButton
              showCurrentBalance={showCurrentBalance}
              toggleShowCurrentBalance={() =>
                setShowCurrentBalance(!showCurrentBalance)
              }
            />
          )}
          <BalanceLoadBalance />
        </div>
      </div>
      <BalanceItem
        logo={pixLogo}
        altText="pix"
        balance={formatCurrencyValue(brlBalance)}
        isLoading={isLoading}
        showCurrentBalance={showCurrentBalance}
      />
      <BalanceItem
        logo={bitcoinLogo}
        altText="bitcoin"
        balance={parseFloat(btcBalance).toFixed(0)}
        isLoading={isLoading}
        showCurrentBalance={showCurrentBalance}
        unit=" SATS"
      />
      {/* <BalanceItem
      customLogo={
        <div className="flex items-center gap-2">
          <img src={pixLogo} alt="pix" className="w-4 h-4 grayscale" />
          <span className="font-bold">+</span>
          <img
            src={bitcoinLogo}
            alt="bitcoin"
            className="w-4 h-4 grayscale"
          />
        </div>
      }
      altText="pix e bitcoin"
      balance={formatCurrencyValue(brlBalance + btcBalance)}
      isLoading={isLoading}
      showCurrentBalance={showCurrentBalance}
    /> */}
    </div>
  );
};

export const BalanceMobilePreview: React.FC = () => {
  const { controller } = useRecoilValue(balanceState);
  const { showCurrentBalance, isLoading } = controller;
  const { setShowCurrentBalance } = useSetShowCurrentBalanceUseCase();
  const { user } = useRecoilValue(authState);
  const { brlBalance, btcBalance } = user;
  return (
    <div className="flex gap-2 flex-col items-stretch w-full ">
      <div className="flex items-center justify-end">
        {!isLoading && (
          <BalanceToggleButton
            showCurrentBalance={showCurrentBalance}
            toggleShowCurrentBalance={() =>
              setShowCurrentBalance(!showCurrentBalance)
            }
          />
        )}
      </div>
      <BalanceItem
        logo={pixLogo}
        altText="pix"
        balance={formatCurrencyValue(brlBalance)}
        isLoading={isLoading}
        showCurrentBalance={showCurrentBalance}
      />
      <BalanceItem
        logo={bitcoinLogo}
        altText="bitcoin"
        balance={parseFloat(btcBalance).toFixed(0)}
        isLoading={isLoading}
        showCurrentBalance={showCurrentBalance}
        unit=" SATS"
      />
      {/* <BalanceItem
        customLogo={
          <div className="flex items-center gap-2">
            <img src={pixLogo} alt="pix" className="w-4 h-4 grayscale" />
            <span className="font-bold">+</span>
            <img
              src={bitcoinLogo}
              alt="bitcoin"
              className="w-4 h-4 grayscale"
            />
          </div>
        }
        altText="pix e bitcoin"
        balance={formatCurrencyValue(brlBalance + btcBalance)}
        isLoading={isLoading}
        showCurrentBalance={showCurrentBalance}
      /> */}
    </div>
  );
};
