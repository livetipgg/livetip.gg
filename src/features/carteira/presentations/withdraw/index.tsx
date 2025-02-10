import { withLayout } from "@/HOC/withLayout";
import PaymentIcon from "@/components/payment-icon";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authState } from "@/features/auth/states/atoms";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { withdrawState } from "../../states/atoms";
import { AlertCircle, ClipboardPaste, LoaderCircle } from "lucide-react";
import { useWithdrawUseCase } from "../../useCases/useWithdrawBtcUseCase";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HelpButton } from "@/features/auth/implementation/components/help-button";
import { PixWithdraw } from "./components/pix-withdraw";

const Withdraw = () => {
  const { user } = useRecoilValue(authState);
  const { controller } = useRecoilValue(withdrawState);
  const [withdrawType, setWithdrawType] = useState("BTC");
  const { loading } = controller;
  const [, setValue] = useState("0");
  const [invoice, setInvoice] = useState("");
  const { withdraw } = useWithdrawUseCase();

  const textareaRef = useRef(null);

  const isAdmin = user.id === 3 || user.id === 5;
  const handleInputChange = (e) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    setInvoice(e.target.value);
  };
  return (
    <div className="h-full w-full flex flex-col ">
      {/* {!isAdmin && (
        <>
          <HelpButton />

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>
              O saque de PIX está indisponível no momento. Para fazer retiradas
              em BRL, entre em contato diretamente com o suporte.
            </AlertDescription>
          </Alert>
        </>
      )}

      <div className="max-w-3xl w-full  mt-4">
        <div className="border p-5 bg-card-custom rounded-lg">
          <Tabs defaultValue="satoshi" className="">
            <TabsList className="mb-5">
              <div className="flex items-center gap-2 ">
                {isAdmin && (
                  <TabsTrigger
                    value="pix"
                    className="flex items-center gap-2"
                    onClick={() => setWithdrawType("BRL")}
                  >
                    <PaymentIcon currency="BRL" className="w-4" />
                    Pix
                  </TabsTrigger>
                )}

                <TabsTrigger
                  value="satoshi"
                  className="flex items-center gap-2"
                  onClick={() => setWithdrawType("BTC")}
                >
                  <PaymentIcon currency="BTC" className="w-4" />
                  Bitcoin
                </TabsTrigger>
              </div>
            </TabsList>
            <TabsContent value="pix">
              <PixWithdraw />
            </TabsContent>
            <TabsContent value="satoshi" className="w-full ">
              <div className="flex flex-col w-full">
                <strong className="text-xl">Destino do saque</strong>
                <span className="mt-3 text-muted-foreground ">
                  Informe o invoice
                </span>
                <div className="mt-4">
                  <div className="flex justify-between gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-muted-foreground">
                      Saldo disponível:{" "}
                      <strong className="text-primary">
                        {user.btcBalance} SATS
                      </strong>
                    </span>
                    <Button
                      className="flex items-center gap-2"
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.readText().then((text) => {
                          handleInputChange({ target: { value: text } });
                        });
                      }}
                    >
                      <ClipboardPaste size={16} />
                      Colar
                    </Button>
                    <Textarea
                      ref={textareaRef}
                      className="p-5 rounded-xl shadow-none bg-background w-full overflow-hidden resize-none"
                      value={invoice}
                      onChange={handleInputChange}
                      placeholder="Digite o invoice"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end mt-2">
          <Button
            variant="default"
            disabled={
              withdrawType === "" || (withdrawType === "BTC" && invoice === "")
            }
            onClick={() => {
              if (withdrawType === "BTC") {
                withdraw({ invoice, currency: "BTC" });
              }

              setInvoice("");
              setValue("0");
            }}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" size={20} />
                Enviando...
              </>
            ) : (
              "Sacar"
            )}
          </Button>
        </div>
      </div> */}
      <Tabs defaultValue="satoshi" className="">
        <TabsList className="mb-5 bg-transparent border rounded-full ">
          <div className="flex items-center gap-2  ">
            {/* {isAdmin && ( */}
            <TabsTrigger
              value="pix"
              className="flex items-center gap-2 tadata-[state=active]:bg-[#FE4E01]/10  data-[state=active]:text-primary  data-[state=active]:border-primary  data-[state=active]:border rounded-full "
              onClick={() => setWithdrawType("BRL")}
            >
              Pix
            </TabsTrigger>
            {/* )} */}

            <TabsTrigger
              value="satoshi"
              className="flex items-center gap-2 data-[state=active]:bg-[#FE4E01]/10  data-[state=active]:text-primary  data-[state=active]:border-primary  data-[state=active]:border rounded-full "
              onClick={() => setWithdrawType("BTC")}
            >
              Bitcoin
            </TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="pix">
          <PixWithdraw />
        </TabsContent>
        <TabsContent value="satoshi" className="w-full ">
          Sats
        </TabsContent>
      </Tabs>
    </div>
  );
};

const WithdrawPage = withLayout(Withdraw);

export default WithdrawPage;
