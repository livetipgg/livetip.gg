import logotipoWhite from "@/assets/logotipo_white.svg";
import icon from "@/assets/icon.svg";
import { useTheme } from "./theme-provider";
import { useIsMobile } from "@/hooks/use-mobile";

export const Logotipo = ({ classname }: { classname?: string }) => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  if (theme === "dark") {
    return (
      <img
        src={isMobile ? icon : logotipoWhite}
        alt="Logotipo"
        className={classname}
      />
    );
  }
  return (
    <img
      src={isMobile ? icon : logotipoWhite}
      alt="Logotipo"
      className={classname}
    />
  );
};
