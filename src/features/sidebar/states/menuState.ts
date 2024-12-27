import { atom, selector } from "recoil";
import { DashboardIcon } from "@radix-ui/react-icons";
import {
  ArrowLeftRight,
  ArrowUpDown,
  Landmark,
  MessageSquareDotIcon,
  Shield,
  UserPen,
} from "lucide-react";
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
    // {
    //   label: "Histórico de transações",
    //   icon: Landmark,
    //   to: "/carteira/historico",
    // },
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
      label: "Financeiro",
      icon: Landmark,
      to: "#",
      subItems: [
        {
          label: "Histórico de Transações",
          icon: ArrowUpDown,
          to: "/carteira/historico",
        },
        {
          label: "Saque",
          icon: ArrowLeftRight,
          to: "/carteira/saque",
        },
      ],
    },
    {
      label: "Painel Admin",
      icon: Shield,
      to: "",
      role: "admin",
      subItems: [
        {
          label: "Gerenciar Usuários",
          icon: ArrowLeftRight,
          to: "/admin/usuarios",
          role: "admin",
        },
      ],
    },
    // {
    //   label: "Apresentação",
    //   icon: MessagesSquare,
    //   to: "/configuracoes",
    // },
  ],
});

export const filteredMenuState = selector({
  key: "filteredMenuState",
  get: ({ get }) => {
    const menuItems = get(menuState);
    const state = get(authState);

    return menuItems
      .map((item) => {
        // Filtra subItems com base no role do usuário
        const subItems = item.subItems?.filter(
          (subItem) =>
            !subItem.role || subItem.role.includes(state.user.username)
        );

        // Se o item não requer role ou o usuário possui o role necessário, inclui o item
        if (!item.role || item.role.includes(state.user.username)) {
          return { ...item, subItems };
        }

        // Caso o item principal tenha subItems acessíveis, retorna o item com esses subItems
        if (subItems && subItems.length > 0) {
          return { ...item, subItems };
        }

        return null; // Exclui o item se o usuário não tem permissão
      })
      .filter(Boolean); // Remove itens nulos
  },
});
