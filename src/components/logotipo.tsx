import logotipoWhite from "@/assets/logotipo_white.png";
import logotipoDark from "@/assets/logotipo_dark.png";
import icon from "@/assets/icon.png";
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
      src={isMobile ? icon : logotipoDark}
      alt="Logotipo"
      className={classname}
    />
  );
};
