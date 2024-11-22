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
  UserMessage: {
    path: "/:userId",
    label: "Mensagem Usuário",
    name: "mensagem-usuario",
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

  NotFound: {
    path: "*",
    label: "Not Found",
    name: "notFound",
  },
} as const;
