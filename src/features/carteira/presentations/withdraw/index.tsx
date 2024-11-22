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
import { useState } from "react";
import { PatternFormat } from "react-number-format";
import { useRecoilValue } from "recoil";
import { useWithdrawBtcUseCase } from "../../useCases/useWithdrawBtcUseCase";
import { withdrawState } from "../../states/atoms";
import { LoaderCircle } from "lucide-react";
import InputMoney from "@/components/input-currency";

const Withdraw = () => {
  const { user } = useRecoilValue(authState);
  const { controller } = useRecoilValue(withdrawState);
  const { loading } = controller;
  const [value, setValue] = useState(0);
  const { brlBalance, btcBalance } = user;
  const [invoice, setInvoice] = useState("");
  const [selectedKey, setSelectedKey] = useState("cpf");
  const { withdrawBTC } = useWithdrawBtcUseCase();
  console.log("BRL Balance", brlBalance);
  console.log("BTC Balance", btcBalance);
  return (
    <div className="h-full w-full flex flex-col ">
      <div className="max-w-3xl w-full  mt-4">
        <div className="border p-5 bg-card-custom rounded-lg">
          <Tabs defaultValue="pix" className="w-[400px]">
            <TabsList className="mb-5">
              <div className="flex items-center gap-2 ">
                <TabsTrigger value="pix" className="flex items-center gap-2">
                  <PaymentIcon currency="BRL" className="w-4" />
                  Pix
                </TabsTrigger>
                <TabsTrigger
                  value="satoshi"
                  className="flex items-center gap-2"
                >
                  <PaymentIcon currency="BTC" className="w-4" />
                  Satoshis
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
                    onValueChange={(value) => setSelectedKey(value)}
                  >
                    <SelectTrigger className="p-5 rounded-xl shadow-none bg-background">
                      <SelectValue placeholder="Chave pix" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpf">CPF</SelectItem>
                      <SelectItem value="cnpj">CNPJ</SelectItem>
                      <SelectItem value="email">E-mail</SelectItem>
                      <SelectItem value="phone">Telefone</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="mt-4">
                    <Label>
                      {
                        {
                          cpf: "CPF",
                          cnpj: "CNPJ",
                          email: "E-mail",
                          phone: "Telefone",
                        }[selectedKey]
                      }
                    </Label>
                    {selectedKey === "cpf" && (
                      <PatternFormat
                        className="p-5 rounded-xl shadow-none bg-background"
                        format="###.###.###-##"
                        mask="_"
                        customInput={Input}
                        placeholder="Digite seu CPF"
                      />
                    )}
                    {selectedKey === "cnpj" && (
                      <PatternFormat
                        className="p-5 rounded-xl shadow-none bg-background"
                        format="##.###.###/####-##"
                        mask="_"
                        customInput={Input}
                        placeholder="Digite seu CNPJ"
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
                        onChange={(event) =>
                          setValue(Number(event.target.value))
                        }
                        value={value}
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
            <TabsContent value="satoshi">
              <div className="flex flex-col">
                <strong className="text-xl">Destino do saque</strong>
                <span className="mt-3 text-muted-foreground">
                  Informe a invoice para transferir os satoshis.
                </span>
                <div className="w-[300px] mt-10">
                  <Label>Informe o invoice criado</Label>

                  <Input
                    className="p-5 rounded-xl shadow-none bg-background"
                    type="text"
                    value={invoice}
                    onChange={(e) => setInvoice(e.target.value)}
                    placeholder="Digite o invoice"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end mt-2">
          <Button
            variant="default"
            disabled={!invoice}
            onClick={() => {
              withdrawBTC({ invoice, currency: "BTC" });

              setInvoice("");
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
