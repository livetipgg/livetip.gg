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
    path: "/donate/:id",
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
    label: "Perfil",
    name: "perfil",
  },
  Transmission: {
    path: "/transmissao/:id",
    label: "Transmissão",
    name: "transmissao",
  },
  NotFound: {
    path: "*",
    label: "Not Found",
    name: "notFound",
  },
} as const;
