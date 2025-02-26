import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect } from "react";

export const IntegrationBlock = () => {
  // https://api.streamelements.com/oauth2/authorize
  const client_secret = import.meta.env.VITE_STREAM_ELEMENTS_CLIENT_SECRET;
  const client_id = import.meta.env.VITE_STREAM_ELEMENTS_CLIENT_ID;
  //api.streamelements.com/oauth2/authorize
  const handleConnectStreamElements = () => {
    // abre uma nova janela para o usuário se autenticar,  passa o client_id, redirect_uri, response_type e scope
    window.open(
      `https://api.streamelements.com/oauth2/authorize?client_id=${client_id}&response_type=code&redirect_uri=https://dev.livetip.gg/perfil&scope=channel:read`
    );
  };

  // fetch token https://api.streamelements.com/oauth2/token

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");

    if (code) {
      fetchToken(code);
    }
  }, []);

  const fetchToken = async (code: string) => {
    const response = await axios.post(
      "https://api.streamelements.com/oauth2/token",
      {
        client_id,
        client_secret,
        code,
        grant_type: "authorization_code",
        redirect_uri: "https://dev.livetip.gg/perfil",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response", response);
  };

  return (
    <div>
      <Button onClick={handleConnectStreamElements}>
        Conectar com Stream Elements
      </Button>
    </div>
  );
};
