import logotipoWhite from "@/assets/logotipo_white.png";
import logotipoDark from "@/assets/logotipo_dark.png";
import { useTheme } from "./theme-provider";

export const Logotipo = ({ classname }: { classname: string }) => {
  const { theme } = useTheme();

  if (theme === "dark") {
    return <img src={logotipoWhite} alt="Logotipo" className={classname} />;
  }
  return <img src={logotipoDark} alt="Logotipo" className={classname} />;
};
