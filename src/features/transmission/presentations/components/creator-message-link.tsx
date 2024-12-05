import { Button } from "@/components/ui/button";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { Copy } from "lucide-react";

export const CreatorMessageLink = ({ url, user }) => {
  const { successSonner } = useCustomSonner();
  return (
    <div className="max-w-fit bg-background shadow-sm">
      <div className="border rounded flex items-center ">
        <Button
          className="text-secondary"
          variant="link"
          onClick={() => {
            navigator.clipboard.writeText(`${url}${user.username}`);

            successSonner("Link copiado com sucesso!");
          }}
        >
          {url}
          {user.username}
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            navigator.clipboard.writeText(`${url}${user.username}`);

            successSonner("Link copiado com sucesso!");
          }}
        >
          <Copy className="w-4 h-4 mr-2" />
          Copiar
        </Button>
      </div>
    </div>
  );
};
