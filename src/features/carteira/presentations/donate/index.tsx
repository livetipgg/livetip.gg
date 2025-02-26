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
import ReactGA from "react-ga4";
import { TRACKING_ID } from "@/App";
import { GlobalLoader } from "@/components/global-loader";
import { NotFoundPage } from "@/features/not-found-page";
import { ModeToggle } from "@/components/mode-toggle";

const UserMessagePage = () => {
  const { loadReceiverData } = useLoadReceiverData();
  const donateState = useRecoilValue(paymentDonateState);
  const { controller } = donateState;

  const params = useParams();
  const { userId } = params;
  const { setTheme } = useTheme();
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send({
      hitType: "pageview",
      page: `/${userId}`,
      title: `Mensagem ${userId}`,
    });

    window.document.title = `LiveTip - ${userId}`;
  }, []);

  useEffect(() => {
    setTheme("light");

    if (userId) {
      loadReceiverData(userId);
    }
  }, [userId]);

  if (controller.loadingReceiverData) {
    return <GlobalLoader />;
  }

  if (!userId) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-100">
        <h1>User ID not provided.</h1>
      </div>
    );
  }

  if (controller.errorMessage) {
    return <NotFoundPage />;
  }
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-background relative">
      <div className="bg-card-custom rounded-2xl p-5 max-w-[320px] w-full border flex items-center flex-col justify-center  h-full max-h-screen overflow-hidden m-2 relative">
        <ModeToggle className="absolute top-1 right-1 " />
        <Header />
        <div className="mt-2 flex items-center justify-center flex-col w-full">
          {controller.currentStep === "MESSAGE" && <MessageStep />}
          {controller.currentStep === "PAYMENT" && <PaymentStep />}
          {controller.currentStep === "SUCCESS" && <SuccessStep />}
        </div>
      </div>
    </div>
  );
};

export default UserMessagePage;
