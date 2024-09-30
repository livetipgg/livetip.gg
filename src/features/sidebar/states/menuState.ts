import { atom } from "recoil";
import { DashboardIcon } from "@radix-ui/react-icons";
import { ArrowLeftRight, MessageSquareDotIcon } from "lucide-react";
import { PiBank, PiHandWithdraw } from "react-icons/pi";

export interface MenuItem {
  label: string;
  icon: React.ElementType;
  to: string;
  subItems?: MenuItem[];
}

export const menuState = atom<MenuItem[]>({
  key: "menuState",
  default: [
    {
      label: "Dashboard",
      icon: DashboardIcon,
      to: "/inicio",
    },
    {
      label: "Carteira",
      icon: PiBank,
      to: "#",
      subItems: [
        {
          label: "Saque",
          icon: PiHandWithdraw,
          to: "/carteira/saque",
        },
        {
          label: "Histórico",
          icon: ArrowLeftRight,
          to: "/carteira/historico",
        },
      ],
    },
    {
      label: "Ver mensagens recebidas",
      icon: MessageSquareDotIcon,
      to: "/mensagens-recebidas",
    },
    // {
    //   label: "Apresentação",
    //   icon: MessagesSquare,
    //   to: "/configuracoes",
    // },

    // {
    //   label: "Financeiro",
    //   icon: PiMoney,
    //   to: "#",
    //   subItems: [
    //     {
    //       label: "Transações",
    //       icon: ArrowUpDown,
    //       to: "/financeiro/transacoes",
    //     },
    //     {
    //       label: "Boletos",
    //       icon: File,
    //       to: "/financeiro/boletos",
    //     },
    //     {
    //       // Projeções
    //       label: "Projeções",
    //       icon: LineChart,
    //       to: "/financeiro/projecoes",
    //     },
    //     {
    //       label: "Contas bancárias",
    //       icon: CreditCard,
    //       to: "/financeiro/contas-bancarias",
    //     },
    //   ],
    // },
  ],
});
