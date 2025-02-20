import { withLayout } from "@/HOC/withLayout";
import { useFetchSystemSettings } from "../../useCases/useAdminGetSystemSettingsUseCase";
import { Settings } from "lucide-react";
import { formatCurrencyValue } from "@/helpers/formatCurrencyValue";
import InputMoney from "@/components/input-currency";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useCreateApiInstance from "@/config/api";
import { useCustomSonner } from "@/hooks/useCustomSonner";

const AdminSettings = () => {
  const api = useCreateApiInstance();
  const { data, isLoading, refetch } = useFetchSystemSettings();
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [newValue, setNewValue] = useState("0");
  const { successSonner, errorSonner } = useCustomSonner();

  const handleSave = async (id) => {
    setIsSaveLoading(true);
    try {
      await api.patch(`/system-settings/${id}`, {
        value: newValue,
      });
      setIsEdit(false);
      successSonner("Configuração salva com sucesso");
      refetch();
    } catch (error) {
      console.log(error);

      errorSonner("Erro ao salvar configuração");
    } finally {
      setIsSaveLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  console.log(data);
  return (
    <div>
      {data?.map((setting) => (
        <div
          key={setting.id}
          className="border rounded p-2 flex items-center gap-2"
        >
          <div>
            <Settings size={24} className="opacity-30" />
          </div>
          <div className="flex items-center justify-between flex-1">
            <div className="flex flex-col gap-2 flex-1 w-full">
              <h1 className="font-semibold text-md">{setting.description}</h1>
              <div className="max-w-[200px]">
                {isSaveLoading ? (
                  "Salvando..."
                ) : isEdit ? (
                  <InputMoney
                    className="border-none "
                    onChange={(event) => setNewValue(event.target.value)}
                    value={Number(newValue)}
                  />
                ) : (
                  <span>{formatCurrencyValue(setting.value)}</span>
                )}
              </div>
            </div>
            <div>
              <Button
                variant={isEdit ? "default" : "link"}
                disabled={isSaveLoading}
                onClick={() => {
                  setIsEdit(!isEdit);

                  if (!isEdit) {
                    setNewValue(setting.value);
                  }

                  if (isEdit) {
                    handleSave(setting.id);
                  }
                }}
              >
                {isSaveLoading ? "Salvando..." : isEdit ? "Salvar" : "Editar"}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AdminSettingsPage = withLayout(AdminSettings, "LiveTip - Painel Admin");
export default AdminSettingsPage;
