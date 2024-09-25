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
    path: "/mensagem-usuario",
    label: "Mensagem Usuário",
    name: "mensagem-usuario",
  },
  NotFound: {
    path: "*",
    label: "Not Found",
    name: "notFound",
  },
} as const;
