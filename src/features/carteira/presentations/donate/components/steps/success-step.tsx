import { Button } from "@/components/ui/button";
import { IPaymentDonateState } from "@/features/carteira/contracts/IRecoilState";
import { paymentDonateState } from "@/features/carteira/states/atoms";
import { useSetRecoilState } from "recoil";

const SuccessStep = () => {
  const setPaymentDonateState = useSetRecoilState(paymentDonateState);

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <h1 className="text-success text-center font-bold text-2xl">
          Obrigado pela sua mensagem!
        </h1>
        <p className="text-muted-foreground text-center mt-2">
          Sua Mensagem foi enviada com sucesso. Em alguns instantes aparecerá
          para o criador de conteúdo.
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
        MANDAR OUTRA MENSAGEM
      </Button>
    </>
  );
};

export default SuccessStep;
