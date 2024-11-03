import { withLayout } from "@/HOC/withLayout";
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
import { useState } from "react";
import { NumericFormat } from "react-number-format";

const Withdraw = () => {
  const [selectedKey, setSelectedKey] = useState("cpf");

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="max-w-3xl w-full  mt-4">
        <div className="border p-5bg-card-custom rounded-lg">
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
                <SelectTrigger className="w-full ">
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
                  <Input
                    placeholder="Digite seu CPF"
                    value={"999.999.999.99"}
                    disabled
                  />
                )}
                {selectedKey === "cnpj" && (
                  <Input placeholder="Digite seu CNPJ" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="border p-5  bg-card-custom rounded-lg mt-10">
          <div className="flex flex-col">
            <strong className="text-xl">Valor do saque</strong>
            <span className="mt-3 text-muted-foreground">
              Informe o valor que deseja sacar.
            </span>
            <div className="w-[300px] mt-10">
              <Label>Valor do saque</Label>
              <NumericFormat
                thousandSeparator={true}
                decimalScale={2}
                prefix="R$"
                fixedDecimalScale
                allowNegative={false}
                customInput={Input}
                placeholder="R$ 0,00"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <Button variant="default">Continuar</Button>
        </div>
      </div>
    </div>
  );
};

const WithdrawPage = withLayout(Withdraw);

export default WithdrawPage;
