/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useTheme } from "@/components/theme-provider";
import { useRecoilValue } from "recoil";
import { paymentDonateState } from "../../states/atoms";
import SuccessStep from "./components/steps/success-step";
import PaymentStep from "./components/steps/payment-step";
import MessageStep from "./components/steps/message-step";
import { Header } from "./components/header";
import { useLoadReceiverData } from "../../useCases/useLoadReceiverData";
import { useParams } from "react-router-dom";
import { ErrorAlert } from "@/components/error-alert";
import { LoaderCircle } from "lucide-react";
const UserMessagePage = () => {
  const { loadReceiverData } = useLoadReceiverData();
  const donateState = useRecoilValue(paymentDonateState);
  const { controller } = donateState;
  const params = useParams();
  const { userId } = params;
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");

    if (userId) {
      loadReceiverData(userId);
    }
  }, []);

  if (controller.loadingReceiverData) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-100">
        <div className="bg-white p-4 rounded-lg flex items-center justify-center flex-col space-y-4">
          <LoaderCircle className="w-8 h-8 animate-spin" />
          <h1>Carregando informações...</h1>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-100">
        <h1>User ID not provided.</h1>
      </div>
    );
  }
  if (controller.errorMessage) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-100">
        <span></span>
        <h1>
          <ErrorAlert
            error={`Esta página não existe. Verifique o endereço e tente novamente.`}
          />
        </h1>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-100">
      <div className="bg-white rounded-2xl p-5 max-w-[320px] w-full flex items-center flex-col justify-center relative ">
        <Header />
        <div className="mt-10 flex items-center justify-center flex-col w-full">
          {controller.currentStep === "MESSAGE" && <MessageStep />}
          {controller.currentStep === "SUCCESS" && <SuccessStep />}
          {controller.currentStep === "PAYMENT" && <PaymentStep />}
        </div>
      </div>
    </div>
  );
};

export default UserMessagePage;
