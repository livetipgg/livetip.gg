import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CountUp from "react-countup";

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
}) => {
  return (
    <Card style={{ borderBottom: `4px solid ${borderColor}` }}>
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
          {!isLoading && (
            <CountUp
              start={0}
              end={endValue}
              duration={2}
              decimals={decimals}
              prefix={prefix}
              separator="."
              decimal=","
            />
          )}
        </span>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
