import { cn } from "@/lib/utils";
import { useState } from "react";
import { EditUserBlock } from "./user-edit/edit-user-block";

const tabsItems = [
  {
    value: "my_profile",
    label: "Meu Perfil",
  },
  {
    value: "my_settings",
    label: "Configurações",
  },
];

export const TabsSettingsRoot = () => {
  const [activeTab, setActiveTab] = useState("my_profile");

  return (
    <div className="rounded border flex">
      <div className="flex flex-col rounded bg-card-custom py-6 px-2 border-r">
        {tabsItems.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "px-4 py-2   text-sm font-medium flex justify-start border border-none",
              activeTab === tab.value
                ? " text-primary bg-[#FE4E01]/10 rounded-full border border-primary"
                : "text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "my_profile" && (
        <TabContentContainer>
          <TabHeader item={tabsItems[0]} />
          <EditUserBlock />
        </TabContentContainer>
      )}
      {activeTab === "my_settings" && (
        <TabContentContainer>
          <TabHeader item={tabsItems[1]} />
          <div>My Settings</div>
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
