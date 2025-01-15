import { useRecoilValue } from "recoil";
import { TabContentBlock } from "../tabs-settings-root";
import { UserDynamicQrcode } from "./components/user-dynamic-qrcode";
import { authState } from "@/features/auth/states/atoms";
import { Link, MessageCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export const QRCodeWidgetsBlock = () => {
  const { user } = useRecoilValue(authState);

  const [config, setConfig] = useState({
    showLink: true,
    showMessage: true,
  });

  return (
    <TabContentBlock>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="col-span-3 gap-4">
          {/* Configs */}
          <div className="flex flex-col gap-2">
            <ConfigContainer
              title="Exibir link da página no topo"
              description="Mostrar o link da sua página de doação no topo do QRCode."
              icon={<Link size={24} />}
              onSwitch={() => {
                setConfig((prev) => ({
                  ...prev,
                  showLink: !prev.showLink,
                }));
              }}
              checked={config.showLink}
            />
            <ConfigContainer
              title="Exibir mensagem embaixo"
              description="Mostrar a mensagem personalizada embaixo do QRCode."
              icon={<MessageCircle size={24} />}
              onSwitch={() => {
                setConfig((prev) => ({
                  ...prev,
                  showMessage: !prev.showMessage,
                }));
              }}
              checked={config.showMessage}
            />
          </div>
        </div>
        <div className="bg-card-custom rounded border p-4">
          <div className="flex flex-col mt-5">
            <span className="font-bold text-sm">Widget QRcode</span>
            <span className="font-normal text-sm mt-4">
              Permite que seus viewers escaneiem e sejam direcionados para a sua
              página.
            </span>
          </div>
          <div className="p-10 my-4 flex items-center justify-center bg-background rounded border">
            <UserDynamicQrcode user={user} config={config} />
          </div>
        </div>
      </div>
    </TabContentBlock>
  );
};

const ConfigContainer = ({ title, description, icon, onSwitch, checked }) => {
  return (
    <div className="flex items-center justify-between bg-card-custom rounded border p-4">
      <div className="flex items-start gap-3">
        {icon && <div>{icon}</div>}
        <div className="flex flex-col">
          <span className="font-bold">{title}</span>
          <span>{description}</span>
        </div>
      </div>
      <Switch onCheckedChange={onSwitch} checked={checked} />
    </div>
  );
};
