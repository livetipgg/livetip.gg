import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { balanceState } from "@/features/balance/states/atoms";
import CountUp from "react-countup";
import { useRecoilValue } from "recoil";

interface AnalyticsCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  endValue: number;
  borderColor: string;
  textColor: string;
  prefix?: string;
  decimals?: number;
  isLoading?: boolean;
  error?: string;
  convertToCurrency?: boolean;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  subtitle,
  icon,
  endValue,
  borderColor,
  textColor,
  isLoading,
  prefix = "",
  decimals = 0,
  error = null,
}) => {
  const { controller } = useRecoilValue(balanceState);
  const { showCurrentBalance } = controller;
  return (
    <Card
      style={{ borderBottom: `4px solid ${borderColor}` }}
      className="bg-card-custom shadow-none"
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isLoading && (
            <>
              <Skeleton
                className="w-8 h-8 rounded-full"
                style={{ minWidth: 32 }}
              />
              <Skeleton className="w-2/4 h-6" />
            </>
          )}
          {!isLoading && icon}
          {!isLoading && title}
        </CardTitle>
        <span className="text-muted-foreground">
          {isLoading && <Skeleton className="w-3/4 h-4" />}
          {!isLoading && subtitle}
        </span>
      </CardHeader>
      <CardContent>
        <span className={`text-2xl font-semibold ${textColor}`}>
          {isLoading && <Skeleton className="w-2/5 h-8" />}
          {!isLoading && !error && showCurrentBalance && (
            <>
              <CountUp
                start={0}
                end={endValue}
                duration={2}
                decimals={decimals}
                prefix={prefix}
                separator="."
                decimal=","
              />
              {/* {convertToCurrency && (
                <small
                  className="text-gray-500 text-sm font-semibold ml-1
                "
                >
                  = R$ 12,23
                </small>
              )} */}
            </>
          )}
          {!isLoading && !error && !showCurrentBalance && (
            <span className="blur-sm">
              {prefix} {endValue.toFixed(decimals)}
            </span>
          )}
          {!isLoading && error && (
            <span className="text-muted-foreground text-xs">{error}</span>
          )}
        </span>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
