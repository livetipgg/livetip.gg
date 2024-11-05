import { atom, selector } from "recoil";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Landmark, MessageSquareDotIcon, Shield, UserPen } from "lucide-react";
import { authState } from "@/features/auth/states/atoms";

export interface MenuItem {
  label: string;
  icon: React.ElementType;
  to: string;
  subItems?: MenuItem[];
  role?: string;
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
      label: "Histórico de transações",
      icon: Landmark,
      to: "/carteira/historico",
    },
    {
      label: "Ver mensagens recebidas",
      icon: MessageSquareDotIcon,
      to: "/mensagens-recebidas",
    },
    {
      label: "Meu Perfil",
      icon: UserPen,
      to: "/perfil",
    },
    {
      label: "Painel Admin",
      icon: Shield,
      to: "/admin/painel",
      role: "admin",
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

export const filteredMenuState = selector({
  key: "filteredMenuState",
  get: ({ get }) => {
    const menuItems = get(menuState);
    const state = get(authState);

    return menuItems.filter(
      (item) => !item.role || item.role.includes(state.user.username)
    );
  },
});
