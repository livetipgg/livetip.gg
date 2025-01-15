import { Button } from "@/components/ui/button";

import { useRecoilValue } from "recoil";
import { adminState } from "../../state/atoms";
import { useState } from "react";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentIcon from "@/components/payment-icon";
import InputMoney from "@/components/input-currency";
import CurrencyInput from "react-currency-input-field";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { formAdminVirtualWithdrawSchema } from "../../schemas/formAdminVirtualWithdrawSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/ui/form";
import { useAdminVirtualWithdrawUseCase } from "../../useCases/useAdminVirtualWithdrawUseCase";

import { HandCoins, LoaderCircle } from "lucide-react";

import { useAuthGetUserUseCase } from "@/features/auth/useCases/useAuthGetUserUseCase";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPayment } from "@/helpers/formatPayment";
import { authController } from "@/features/auth/states/atoms";

export const VirtualWithdrawDialog = ({ id }: { id: number }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isLoading } = useRecoilValue(authController);

  const [activeCurrencyMethod, setActiveCurrencyMethod] = useState("BRL");
  const { virtualWithdraw } = useAdminVirtualWithdrawUseCase();
  const { controller } = useRecoilValue(adminState);
  const { isLoadingVirtualWithdraw } = controller;
  const { getUser } = useAuthGetUserUseCase();
  const [auxId, setAuxId] = useState(null);
  const disabled = isLoading && auxId === id;

  const form = useForm<z.infer<typeof formAdminVirtualWithdrawSchema>>({
    resolver: zodResolver(formAdminVirtualWithdrawSchema),
    defaultValues: {
      amount: "0",
      userId: null,
    },
  });

  async function onSubmit(e) {
    e.preventDefault();

    virtualWithdraw(
      {
        userId: auxId,
        amount: form.getValues("amount"),
        currency: activeCurrencyMethod,
      },
      () => {
        setDialogOpen(false);
        form.reset();
      }
    );
  }
  return (
    <Sheet
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) {
          setAuxId(null);
          setSelectedUser(null);
          form.reset();
        }
      }}
    >
      <SheetTrigger asChild>
        <Button
          disabled={disabled}
          title="Realizar saque virtual"
          variant="link"
          size="icon"
          onClick={(e) => {
            setAuxId(id);
            e.preventDefault();
            getUser(id, (user) => {
              setSelectedUser(user);
              setDialogOpen(true);
            });
          }}
        >
          {disabled ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <HandCoins size={16} />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:max-w-[400px] overflow-auto">
        <SheetHeader>
          <SheetTitle>Saque Virtual</SheetTitle>
          <SheetDescription>
            Realize um saque virtual para um usuário. Atualize a quantidade e
            escolha o método de pagamento.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex gap-2">
          <span>Produtor:</span>
          <span className="font-medium">
            {selectedUser?.username || "Usuário não encontrado"}
          </span>
        </div>
        <div className="mt-4 border rounded-xl bg-card-custom p-2">
          <span className="text-sm  font-medium">Saldo disponível</span>
          <div className="flex items-center flex-1 mt-2">
            <div className="flex items-center gap-2 flex-1">
              <PaymentIcon currency="BRL" className="w-6 h-6" />
              <span className="font-medium">
                {formatPayment({
                  amount: parseFloat(selectedUser?.brlBalance),
                  type: "BRL",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <PaymentIcon currency="BTC" className="w-6 h-6" />
              <span className="font-medium">
                {formatPayment({
                  amount: parseFloat(selectedUser?.btcBalance),
                  type: "BTC",
                })}
              </span>
            </div>
          </div>
        </div>
        <FormProvider {...form}>
          <form className="flex flex-col">
            <Tabs defaultValue={"pix"}>
              <TabsList className="mt-5">
                <div className="flex items-center gap-2 ">
                  <TabsTrigger
                    value="pix"
                    className="flex items-center gap-2"
                    onClick={() => setActiveCurrencyMethod("BRL")}
                  >
                    <PaymentIcon currency="BRL" className="w-4" />
                    Pix
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setActiveCurrencyMethod("BTC")}
                    value="satoshi"
                    className="flex items-center gap-2"
                  >
                    <PaymentIcon currency="BTC" className="w-4" />
                    Satoshis
                  </TabsTrigger>
                </div>
              </TabsList>
              <TabsContent value="pix">
                <Label>Valor do saque</Label>

                <FormField
                  name="amount"
                  control={form.control}
                  render={({ field }) => (
                    <InputMoney
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      value={Number(field.value)}
                      title="Preço"
                      className=" rounded-xl shadow-none bg-none ps-1 border-none  text-sm "
                      placeholder="Preço"
                    />
                  )}
                />
              </TabsContent>
              <TabsContent value="satoshi">
                <Label>Valor do saque</Label>
                <FormField
                  name="amount"
                  control={form.control}
                  render={({ field }) => (
                    <CurrencyInput
                      className="rounded-xl"
                      customInput={Input}
                      id="input-example"
                      name="input-name"
                      placeholder="0"
                      defaultValue={0}
                      decimalScale={0}
                      decimalsLimit={0}
                      value={field.value}
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </TabsContent>
            </Tabs>
          </form>
        </FormProvider>
        <SheetFooter className="mt-4">
          <Button onClick={onSubmit} disabled={isLoadingVirtualWithdraw}>
            {isLoadingVirtualWithdraw ? "Sacando..." : "Sacar"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
{
  /* <Select
  onValueChange={(value: any) => {
    field.onChange(value);
    console.log("value", value);
  }}
>
  <SelectTrigger className="bg-card-custom">
    <SelectValue placeholder="Selecione um usuário" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Usuários</SelectLabel>
      {users?.map((user) => (
        <SelectItem key={user.id} value={user.id}>
          <div className="flex gap-2 items-center">
            <Avatar className="w-6 h-6">
              <AvatarImage src={user.photoURL} />
              <AvatarFallback>{user.username[0]}</AvatarFallback>
            </Avatar>
            {user.username}
            <Check
              className={cn(
                "ml-auto",
                value === framework.value ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>; */
}
