import { cn } from "@/lib/utils";
import { useState } from "react";
import { EditUserBlock } from "./user-edit/edit-user-block";
import { UpdateUserPasswordBlock } from "./update-password/update-password";
import { QRCodeWidgetsBlock } from "./qrcode-widgets/qrcode-widgets-block";
import { authState } from "@/features/auth/states/atoms";
import { useRecoilValue } from "recoil";
import { AlertCircle } from "lucide-react";
import { BankAccountBlock } from "./bank-account/update-password";
import { DonatesSettingsBlock } from "./donates-settings/donates-settings";

const tabsItems = [
  {
    value: "my_profile",
    label: "Meu Perfil",
  },
  {
    value: "my_password",
    label: "Minha Senha",
  },
  {
    value: "qrcode_widgets",
    label: "QRCode e widgets",
  },
  {
    value: "bank_account",
    label: "Conta Bancária",
  },
  {
    value: "donates_settings",
    label: "Configurações de doações",
  },
];

export const TabsSettingsRoot = () => {
  const [activeTab, setActiveTab] = useState("my_profile");
  const { user } = useRecoilValue(authState);

  return (
    <div className="rounded border flex flex-col w-full lg:flex-row">
      <div className="flex flex-col rounded bg-card-custom py-6 px-2 border-r lg:max-w-[220px] w-full">
        {tabsItems.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "px-4 py-2   text-sm font-medium flex justify-between border border-none items-center",
              activeTab === tab.value
                ? " text-primary bg-[#FE4E01]/10 rounded-full border border-primary"
                : "text-foreground"
            )}
          >
            {tab.label}
            {tab.value === "my_profile" && !user.emailVerifiedAt && (
              <AlertCircle className="w-4 h-4 text-yellow-500 ml-2" />
            )}
          </button>
        ))}
      </div>
      {activeTab === "my_profile" && (
        <TabContentContainer>
          <TabHeader item={tabsItems[0]} />
          <EditUserBlock />
        </TabContentContainer>
      )}
      {activeTab === "my_password" && (
        <TabContentContainer>
          <TabHeader item={tabsItems[1]} />
          <UpdateUserPasswordBlock />
        </TabContentContainer>
      )}
      {activeTab === "qrcode_widgets" && (
        <TabContentContainer>
          <TabHeader item={tabsItems[2]} />
          <QRCodeWidgetsBlock />
        </TabContentContainer>
      )}
      {activeTab === "bank_account" && (
        <TabContentContainer>
          <TabHeader item={tabsItems[3]} />
          <BankAccountBlock />
        </TabContentContainer>
      )}
      {activeTab === "donates_settings" && (
        <TabContentContainer>
          <TabHeader item={tabsItems[4]} />
          <DonatesSettingsBlock />
        </TabContentContainer>
      )}
    </div>
  );
};

const TabContentContainer = ({ children }) => {
  return <div className="px-10 py-8 w-full">{children}</div>;
};

type Item = {
  value: string;
  label: string;
};

const TabHeader = ({ item }: { item: Item }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className=" font-bold text-md">{item.label}</span>
    </div>
  );
};

export const TabContentBlock = ({ children, className = "" }) => {
  return (
    <div
      className={cn("flex flex-col space-y-4 border-t w-full py-4", className)}
    >
      {children}
    </div>
  );
};
