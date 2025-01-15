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
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 flex flex-col gap-4">
          {/* Configs */}
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
        <div className="flex-none w-full xl:w-1/3 bg-card-custom rounded border p-4">
          <div className="flex flex-col mt-5">
            <span className="font-bold text-sm">Widget QRcode</span>
            <span className="font-normal text-sm mt-4">
              Permite que seus viewers escaneiem e sejam direcionados para a sua
              página.
            </span>
          </div>
          <div className="p-1 md:p-10 my-4 flex items-center justify-center bg-background rounded border">
            <UserDynamicQrcode user={user} config={config} />
          </div>
        </div>
      </div>
    </TabContentBlock>
  );
};

const ConfigContainer = ({ title, description, icon, onSwitch, checked }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-card-custom rounded border p-4">
      <div className="flex items-start gap-3">
        {icon && <div>{icon}</div>}
        <div className="flex flex-col">
          <span className="font-bold">{title}</span>
          <span className="text-sm md:text-md">{description}</span>
        </div>
      </div>
      <Switch onCheckedChange={onSwitch} checked={checked} />
    </div>
  );
};
