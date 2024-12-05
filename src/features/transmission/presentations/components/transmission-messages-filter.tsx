import { Button } from "@/components/ui/button";
import { messageState } from "@/features/messages/states/atoms";
import { useLoadTransmissionMessagesUseCase } from "@/features/messages/useCases/useLoadTransmissionMessagesUseCase";
import { RefreshCw } from "lucide-react";
import { useRecoilValue } from "recoil";

export const TransmissionMessagesFilter = () => {
  const { transmissionMessages, controller } = useRecoilValue(messageState);
  const { isLoadingTransmissionMessages } = controller;
  const { loadTransmissionMessages } = useLoadTransmissionMessagesUseCase();

  return (
    <div className="space-y-5 pb-10">
      <div className="flex items-center justify-between">
        <strong className="text-sm md:text-lg">
          Mensagens do dia ({transmissionMessages.results.length})
        </strong>

        <Button
          variant={"outline"}
          className={`${
            isLoadingTransmissionMessages ? "text-muted-foreground" : ""
          }`}
          title="Atualizar"
          onClick={() => {
            loadTransmissionMessages();
          }}
          disabled={isLoadingTransmissionMessages}
        >
          <span className="mr-2">Atualizar</span>
          <RefreshCw
            className={`w-4 h-4 mb-0 ${
              isLoadingTransmissionMessages ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>
    </div>
  );
};
