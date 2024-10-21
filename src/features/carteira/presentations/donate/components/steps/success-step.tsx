import { Button } from "@/components/ui/button";
import { IPaymentDonateState } from "@/features/carteira/contracts/IRecoilState";
import { paymentDonateState } from "@/features/carteira/states/atoms";
import { useSetRecoilState } from "recoil";

const SuccessStep = () => {
  const setPaymentDonateState = useSetRecoilState(paymentDonateState);

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <h1 className="text-success font-bold text-2xl">
          Obrigado pela sua doação!
        </h1>
        <p className="text-muted-foreground text-center mt-2">
          Sua doação foi concluída com sucesso. Agradecemos seu apoio.
        </p>
      </div>
      <Button
        className="mt-4 w-full"
        onClick={() => {
          setPaymentDonateState((prev: IPaymentDonateState) => ({
            ...prev,
            controller: {
              ...prev.controller,
              currentStep: "MESSAGE",
            },
          }));
        }}
      >
        FAZER OUTRA DOAÇÃO
      </Button>
    </>
  );
};

export default SuccessStep;
