import { withLayout } from "@/HOC/withLayout";
import PaymentIcon from "@/components/payment-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authState } from "@/features/auth/states/atoms";
import { useRef, useState } from "react";
import { PatternFormat } from "react-number-format";
import { useRecoilValue } from "recoil";
import { withdrawState } from "../../states/atoms";
import { ClipboardPaste, LoaderCircle } from "lucide-react";
import InputMoney from "@/components/input-currency";
import { useWithdrawUseCase } from "../../useCases/useWithdrawBtcUseCase";
import { Textarea } from "@/components/ui/textarea";

const Withdraw = () => {
  const { user } = useRecoilValue(authState);
  const { controller } = useRecoilValue(withdrawState);
  const [withdrawType, setWithdrawType] = useState("BTC");
  const [pixKey, setPixKey] = useState("");
  const { loading } = controller;
  const [value, setValue] = useState("0");
  const { brlBalance } = user;
  const [invoice, setInvoice] = useState("");
  const [selectedKey, setSelectedKey] = useState("cpf");
  const { withdraw } = useWithdrawUseCase();

  const textareaRef = useRef(null);

  const isAdmin = user.id === 3;
  const handleInputChange = (e) => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Ajusta a altura para evitar acúmulo ao adicionar mais texto
      textarea.style.height = "auto";
      // Define a nova altura com base no conteúdo
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    setInvoice(e.target.value);
  };
  return (
    <div className="h-full w-full flex flex-col ">
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
              <div className="flex flex-col">
                <strong className="text-xl">Destino do saque</strong>
                <span className="mt-3 text-muted-foreground">
                  Escolha sua chave Pix para receber o saque.
                </span>
                <div className="w-[300px] mt-10">
                  <Label>Tipo da chave PIX</Label>
                  <Select
                    value={selectedKey}
                    defaultValue={selectedKey}
                    onValueChange={(value) => {
                      setSelectedKey(value);
                      setPixKey("");
                    }}
                  >
                    <SelectTrigger className="p-5 rounded-xl shadow-none bg-background">
                      <SelectValue placeholder="Chave pix" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpf">CPF</SelectItem>
                      <SelectItem value="random">Chave Aleatória</SelectItem>
                      <SelectItem value="email">E-mail</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="mt-4">
                    <Label>
                      {
                        {
                          cpf: "CPF",
                          random: "Chave Aleatória",
                          email: "E-mail",
                        }[selectedKey]
                      }
                    </Label>
                    {selectedKey === "cpf" && (
                      <PatternFormat
                        className="p-5 rounded-xl shadow-none bg-background"
                        format="###.###.###-##"
                        mask="_"
                        customInput={Input}
                        value={pixKey}
                        onChange={(e) => setPixKey(e.target.value)}
                        placeholder="Digite seu CPF"
                      />
                    )}

                    {selectedKey === "email" && (
                      <Input
                        className="p-5 rounded-xl shadow-none bg-background"
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={pixKey}
                        onChange={(e) => setPixKey(e.target.value)}
                      />
                    )}
                    {selectedKey === "random" && (
                      <Input
                        className="p-5 rounded-xl shadow-none bg-background"
                        type="text"
                        placeholder="Digite sua chave aleatória"
                        value={pixKey}
                        onChange={(e) => setPixKey(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="w-[300px] mt-10">
                      <div className="flex items-center justify-between">
                        <Label>Valor do saque</Label>
                        <div className="text-xs font-semibold">
                          Saldo disponível: R$ {brlBalance.replace(".", ",")}
                        </div>
                      </div>

                      <InputMoney
                        onChange={(event) => setValue(event.target.value)}
                        value={Number(value)}
                        title="Preço"
                        className=" rounded-xl shadow-none bg-none ps-1 border-none  text-sm "
                        placeholder="Preço"
                      />
                      {/* <NumericFormat
                        className="p-5 rounded-xl shadow-none bg-background"
                        thousandSeparator={true}
                        decimalScale={2}
                        prefix="R$"
                        fixedDecimalScale
                        allowNegative={false}
                        customInput={Input}
                        placeholder="R$ 0,00"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>{" "}
            </TabsContent>
            <TabsContent value="satoshi" className="w-full ">
              <div className="flex flex-col w-full">
                <strong className="text-xl">Destino do saque</strong>
                <span className="mt-3 text-muted-foreground ">
                  Informe o invoice ou a LNURL (exemplo
                  satoshi@walletofsatoshi.com)
                </span>
                <div className="mt-10">
                  <Label>Informe o invoice criado</Label>
                  <div className="flex justify-end gap-2 flex-wrap">
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
                    {/* Paste button */}
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
              withdrawType === "" ||
              (withdrawType === "BRL" && (!pixKey || Number(value) <= 0)) ||
              (withdrawType === "BTC" && invoice === "")
            }
            onClick={() => {
              if (withdrawType === "BRL") {
                withdraw({ amount: value, pixKey, currency: "BRL" });
              }

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
      </div>
    </div>
  );
};

const WithdrawPage = withLayout(Withdraw);

export default WithdrawPage;
