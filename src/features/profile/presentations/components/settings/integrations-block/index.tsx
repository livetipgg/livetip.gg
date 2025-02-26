import { Button } from "@/components/ui/button";
import { useIntegrationsManagement } from "@/hooks/use-integrations-management";
import axios from "axios";
import { useEffect, useState } from "react";

export const IntegrationBlock = () => {
  const [token, setToken] = useState<string | null>(null);
  // https://api.streamelements.com/oauth2/authorize
  const client_secret = import.meta.env.VITE_STREAM_ELEMENTS_CLIENT_SECRET;
  const client_id = import.meta.env.VITE_STREAM_ELEMENTS_CLIENT_ID;
  //api.streamelements.com/oauth2/authorize
  const handleConnectStreamElements = () => {
    // abre uma nova janela para o usuário se autenticar,  passa o client_id, redirect_uri, response_type e scope
    window.open(
      `https://api.streamelements.com/oauth2/authorize?client_id=${client_id}&response_type=code&redirect_uri=https://app.livetip.gg/perfil&scope=tips:write tips:read`
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
        redirect_uri: "https://app.livetip.gg/perfil",
        grant_type: "authorization_code",
      },

      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("response", response);
    setToken(response.data.access_token);
  };
  // D1dAPrWOTSmaot0xosHgmQ
  const { testAlert } = useIntegrationsManagement();

  return (
    <div>
      <Button onClick={handleConnectStreamElements}>
        Conectar com Stream Elements
      </Button>
      <Button onClick={testAlert}>Test alert</Button>
    </div>
  );
};
