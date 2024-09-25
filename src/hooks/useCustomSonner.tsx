import { toast } from "sonner";

export const useCustomSonner = () => {
  const successSonner = (message: string) => {
    toast(message, {
      style: {
        backgroundColor: "#10B981",
        color: "white",
      },
    });
  };

  const errorSonner = (message: string) => {
    toast(message, {
      style: {
        backgroundColor: "#EF4444",
        color: "white",
      },
    });
  };

  return {
    successSonner,
    errorSonner,
  };
};
