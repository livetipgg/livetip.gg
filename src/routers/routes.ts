type RoutesProps = {
  [key: string]: {
    path: string;
    label: string;
    name: string;
  };
};

export const routes: RoutesProps = {
  Login: {
    path: "/",
    label: "Login",
    name: "login",
  },
  Register: {
    path: "/cadastro",
    label: "Cadastro",
    name: "cadastro",
  },
  Dashboard: {
    path: "/inicio",
    label: "Início",
    name: "inicio",
  },
  MessagesReceived: {
    path: "/mensagens-recebidas",
    label: "Mensagens Recebidas",
    name: "mensagens-recebidas",
  },

  Withdraw: {
    path: "/carteira/saque",
    label: "Saque",
    name: "saque",
  },
  Profile: {
    path: "/perfil",
    label: "Meu Perfil",
    name: "perfil",
  },
  Transmission: {
    path: "/transmissao",
    label: "Transmissão",
    name: "transmissao",
  },
  TransmissionExpanded: {
    path: "/transmissao/expanded",
    label: "Transmissão",
    name: "transmissao",
  },
  TransactionsHistory: {
    path: "/carteira/historico",
    label: "Histórico de Transações",
    name: "historico-transacoes",
  },
  Admin: {
    path: "/admin/painel",
    label: "Painel Admin",
    name: "painel-admin",
  },
  UsersManagement: {
    path: "/admin/usuarios",
    label: "Gerenciar Usuários",
    name: "gerenciar-usuarios",
  },
  ApproveAccounts: {
    path: "/admin/aprovar-contas",
    label: "Aprovar Contas",
    name: "aprovar-contas",
  },
  AdminSettings: {
    path: "/admin/settings",
    label: "Configurações do sistema",
    name: "configuracoes-sistema",
  },

  NotFound: {
    path: "*",
    label: "Not Found",
    name: "notFound",
  },
} as const;
