import { messageState } from "@/features/messages/states/atoms";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useLoadTransmissionMessagesUseCase } from "@/features/messages/useCases/useLoadTransmissionMessagesUseCase";

export const TransmissionExpandedPage = () => {
  const [currentMessage, setCurrentMessage] = useState(null);
  const { transmissionMessages } = useRecoilValue(messageState);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < transmissionMessages.results.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const { loadTransmissionMessages } = useLoadTransmissionMessagesUseCase();

  useEffect(() => {
    loadTransmissionMessages();
    console.log("TransmissionMessages", transmissionMessages);
    setCurrentMessage(transmissionMessages.results[currentIndex]);
  }, []);
  console.log("currentMessage", currentMessage);
  return (
    <div className="flex flex-col items-center">
      <div className="border p-4 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold">Mensagem {currentIndex + 1}</h2>
        <p className="text-gray-700 mt-2">{currentMessage?.content}</p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`px-4 py-2 bg-blue-500 text-white rounded ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Voltar
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === transmissionMessages.results.length - 1}
            className={`px-4 py-2 bg-blue-500 text-white rounded ${
              currentIndex === transmissionMessages.results.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};
