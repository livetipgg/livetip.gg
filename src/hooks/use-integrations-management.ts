import axios from "axios";

export const useIntegrationsManagement = () => {
  const testAlert = ({ access_token }) => {
    const channel_id = "655e2536b2b8a137974d4aa4";

    try {
      const response = axios.post(
        `https://api.streamelements.com/kappa/v2/tips/${channel_id}`,
        {
          user: {
            userId: "5f5b3b3b7f4b4b001f3b4b4b",
            username: "dumoresco",
            email: "eduardo@gmail.com",
          },
          provider: "livetip",
          message: "Teste de alerta Livetip",
          amount: 10,
          currency: "BRL",
          imported: false,
        },
        {
          headers: {
            Authorization: `oAuth ${access_token}`,
          },
        }
      );

      getChannel();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const playOverlay = () => {
    // https://api.streamelements.com/kappa/v2/overlays/{channel}/action/{action}

    const channel_id = "655e2536b2b8a137974d4aa4";
    const action = "play";

    try {
      const response = axios.put(
        `https://api.streamelements.com/kappa/v2/overlays/${channel_id}/reload`,
        {},
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjaXRhZGVsIiwiZXhwIjoxNzU2MTIxNzM3LCJqdGkiOiI1MWFhYzkxOS0wY2Y5LTRmMzUtODA4My1mNjc4YjVjMTU2NmQiLCJjaGFubmVsIjoiNjU1ZTI1MzZiMmI4YTEzNzk3NGQ0YWE0Iiwicm9sZSI6Im93bmVyIiwiYXV0aFRva2VuIjoiS1VIYm81Rl9TUXF5Q3p5VGt4cFE3MDU5akl4YWJWLVl4alM5eHVwcWZGYzMwUWRaIiwidXNlciI6IjY1NWUyNTM2YjJiOGExMzc5NzRkNGFhMyIsInVzZXJfaWQiOiJkNTRiMjFiNy00MzQ1LTRjOTItOTI1MC1mZDkxM2YxYjA3YWIiLCJ1c2VyX3JvbGUiOiJjcmVhdG9yIiwicHJvdmlkZXIiOiJ0d2l0Y2giLCJwcm92aWRlcl9pZCI6IjQwNjg1OTgwNyIsImNoYW5uZWxfaWQiOiI2MTdkNjMxZC1kNjQzLTRhYzAtYjEyZS1lNzljYTM1NjBiYjUiLCJjcmVhdG9yX2lkIjoiOTNhNWFhYTgtYTJiNC00NTU0LTljZDktZDJkNjI3ZDRhYmFlIn0.DSPSC6gr4GlIcUw88up5NDXbnA0BuL_KZiHrmYip1aI`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getChannel = () => {
    // https://api.streamelements.com/kappa/v2/channels/me
    try {
      const response = axios.get(
        `https://api.streamelements.com/kappa/v2/channels/me`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjaXRhZGVsIiwiZXhwIjoxNzU2MTIxNzM3LCJqdGkiOiI1MWFhYzkxOS0wY2Y5LTRmMzUtODA4My1mNjc4YjVjMTU2NmQiLCJjaGFubmVsIjoiNjU1ZTI1MzZiMmI4YTEzNzk3NGQ0YWE0Iiwicm9sZSI6Im93bmVyIiwiYXV0aFRva2VuIjoiS1VIYm81Rl9TUXF5Q3p5VGt4cFE3MDU5akl4YWJWLVl4alM5eHVwcWZGYzMwUWRaIiwidXNlciI6IjY1NWUyNTM2YjJiOGExMzc5NzRkNGFhMyIsInVzZXJfaWQiOiJkNTRiMjFiNy00MzQ1LTRjOTItOTI1MC1mZDkxM2YxYjA3YWIiLCJ1c2VyX3JvbGUiOiJjcmVhdG9yIiwicHJvdmlkZXIiOiJ0d2l0Y2giLCJwcm92aWRlcl9pZCI6IjQwNjg1OTgwNyIsImNoYW5uZWxfaWQiOiI2MTdkNjMxZC1kNjQzLTRhYzAtYjEyZS1lNzljYTM1NjBiYjUiLCJjcmVhdG9yX2lkIjoiOTNhNWFhYTgtYTJiNC00NTU0LTljZDktZDJkNjI3ZDRhYmFlIn0.DSPSC6gr4GlIcUw88up5NDXbnA0BuL_KZiHrmYip1aI`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return { testAlert };
};
