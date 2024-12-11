/* eslint-disable react-hooks/exhaustive-deps */

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useRecoilValue } from "recoil";
import { adminState } from "../../state/atoms";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

import { useAdminGetAllUsersUseCase } from "../../useCases/useAdminGetAllUsersUseCase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentIcon from "@/components/payment-icon";
import InputMoney from "@/components/input-currency";
import CurrencyInput from "react-currency-input-field";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormProvider, useForm } from "react-hook-form";
import { formAdminVirtualWithdrawSchema } from "../../schemas/formAdminVirtualWithdrawSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/ui/form";
import { useAdminVirtualWithdrawUseCase } from "../../useCases/useAdminVirtualWithdrawUseCase";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export const VirtualWithdrawDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userFilter, setUserFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeCurrencyMethod, setActiveCurrencyMethod] = useState("BRL");
  const { virtualWithdraw } = useAdminVirtualWithdrawUseCase();
  const { controller, users } = useRecoilValue(adminState);
  const { isLoadingVirtualWithdraw } = controller;
  const { getAllUsers } = useAdminGetAllUsersUseCase();

  useEffect(() => {
    getAllUsers({
      limit: 100,
      page: 1,
    });
  }, []);

  const form = useForm<z.infer<typeof formAdminVirtualWithdrawSchema>>({
    resolver: zodResolver(formAdminVirtualWithdrawSchema),
    defaultValues: {
      amount: "0",
      userId: null,
    },
  });

  const filteredUsers = users?.results.filter((user) =>
    user.username.toLowerCase().includes(userFilter)
  );

  async function onSubmit(e) {
    e.preventDefault();

    virtualWithdraw(
      {
        ...form.getValues(),
        currency: activeCurrencyMethod,
      },
      () => {
        setDialogOpen(false);
        form.reset();
      }
    );
  }
  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(value) => {
        setDialogOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default">Realizar Saque Virtual</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Saque Virtual</DialogTitle>
          <DialogDescription>
            Realize um saque virtual para um usuário. Atualize a quantidade e
            escolha o método de pagamento.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form className="flex flex-col">
            <Label>Usuário</Label>
            <Input
              placeholder="Usuário"
              onChange={(e) => setUserFilter(e.target.value)}
              className="bg-card-custom rounded-xl   text-sm"
            />
            <ScrollArea className="max-h-[200px] overflow-y-auto mt-4">
              {filteredUsers &&
                filteredUsers.map((user) => (
                  <Button
                    key={user.id}
                    variant="ghost"
                    className="w-full flex gap-2 items-center"
                    onClick={(e) => {
                      form.setValue("userId", user.id);
                      setSelectedUser(user);
                      e.preventDefault();
                    }}
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={user.photoURL} />
                      <AvatarFallback>{user.username[0]}</AvatarFallback>
                    </Avatar>
                    {user.username}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedUser?.id === user.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </Button>
                ))}
            </ScrollArea>

            <Tabs defaultValue={"pix"} className="w-[400px]">
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
        <DialogFooter>
          <DialogClose>Cancelar</DialogClose>
          <Button onClick={onSubmit} disabled={isLoadingVirtualWithdraw}>
            {isLoadingVirtualWithdraw ? "Sacando..." : "Sacar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
