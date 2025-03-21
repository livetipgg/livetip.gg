/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { InputMask } from "@react-input/mask";

import { createBankAccountSchema } from "@/features/carteira/schemas/createBankAccountSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useFetchBanks } from "@/hooks/use-fetch-banks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React, { useEffect } from "react";
import { useCreateBankAccount } from "@/features/carteira/useCases/useCreateBankAccount";
import { useRecoilValue } from "recoil";
import { withdrawState } from "@/features/carteira/states/atoms";

export const AddBankAccountDialog = ({ data }: { data?: any }) => {
  const { createBankAccount, editBankAccount } = useCreateBankAccount();
  const { controller } = useRecoilValue(withdrawState);
  const { loadingCreateBankAccount } = controller;
  const form = useForm<z.infer<typeof createBankAccountSchema>>({
    resolver: zodResolver(createBankAccountSchema),
    defaultValues: {
      accountNumber: "",
      agencyNumber: "",
      bankId: "",
      fullName: "",
      pixKey: "",
      pixKeyType: "",
      cpf: "",
    },
  });

  const customMask = (value: string) => {
    if (value === "CPF") {
      return "___.___.___-__";
    }
    if (value === "CNPJ") {
      return "__.___.___/____-__";
    }
    if (value === "PHONE_NUMBER") {
      return "(__) _ ____-____";
    }

    return value;
  };

  const custmReplace = (value: string) => {
    if (value === "CPF") {
      return { _: /./ };
    }
    if (value === "CNPJ") {
      return { _: /./ };
    }
    if (value === "PHONE_NUMBER") {
      return { _: /./ };
    }

    return value;
  };

  const { data: banks, isLoading } = useFetchBanks();
  const [open, setOpen] = React.useState(false);

  const onSubmit = (data: any) => {
    const removePixMask = (keyType: string, value: string) => {
      if (keyType === "CPF" || keyType === "CNPJ") {
        return value.replace(/\D/g, "");
      }
      if (keyType === "PHONE_NUMBER") {
        return value.replace(/\D/g, "");
      }
      if (keyType === "EMAIL" || keyType === "RANDOM") {
        return value.trim();
      }
      return value;
    };

    const payload = {
      ...data,
      // pega o bankId
      bankId: data.bankId.split(" - ")[0],
      pixKey: removePixMask(data.pixKeyType, data.pixKey), // Remove a máscara com base no tipo
      cpf: data.cpf.replace(/\D/g, ""), // Remove tudo que não for número
      agencyNumber: data.agencyNumber.replace(/\D/g, ""),
      accountNumber: data.accountNumber.replace(/\D/g, ""),
    };

    if (controller.bankAccountToEdit) {
      editBankAccount(payload);
      return;
    }

    createBankAccount(payload);
  };

  useEffect(() => {
    if (data) {
      form.setValue("fullName", data.fullName);
      form.setValue("cpf", data.cpf);
      form.setValue("pixKeyType", data.pixKeyType);
      form.setValue("pixKey", data.pixKey);
      form.setValue("agencyNumber", data.agencyNumber);
      form.setValue("accountNumber", data.accountNumber);
      form.setValue("bankId", data.bankId);
    }
  }, [data]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <FormProvider {...form}>
      <div className="max-w-3xl w-full  mt-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="fullName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col w-full ">
                <FormLabel className="text-[#A3A3A3]">Nome Completo</FormLabel>
                <div className="flex-1 flex-col ">
                  <FormControl>
                    <Input
                      {...field}
                      className="input-class bg-background shadow-none rounded-lg p-6"
                      placeholder="Digite seu nome completo"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="cpf"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col w-full ">
                <FormLabel className="text-[#A3A3A3]">CPF</FormLabel>
                <div className="flex-1 flex-col ">
                  <FormControl>
                    <InputMask
                      className="input-class bg-background shadow-none rounded-lg p-6"
                      showMask={true}
                      component={Input}
                      replacement={{ _: /./ }}
                      mask="___.___.___-__"
                      placeholder="___.___.___-__"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="pixKeyType"
            control={form.control}
            render={() => (
              <FormItem className="flex flex-col w-full ">
                <FormLabel className="text-[#A3A3A3]">
                  Tipo da chave pix
                </FormLabel>
                <div className="flex-1 flex-col ">
                  <FormControl>
                    <Select
                      onValueChange={(e) => {
                        form.setValue("pixKeyType", e);
                        form.setValue("pixKey", "");
                      }}
                    >
                      <SelectTrigger className="shadow-none p-6 rounded-lg border-input">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Chaves</SelectLabel>
                          <SelectItem value="CPF">CPF</SelectItem>
                          <SelectItem value="CNPJ">CNPJ</SelectItem>
                          <SelectItem value="PHONE_NUMBER">Telefone</SelectItem>
                          <SelectItem value="RANDOM">Aleatório</SelectItem>
                          <SelectItem value="EMAIL">Email</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="pixKey"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col w-full ">
                <FormLabel className="text-[#A3A3A3]">Chave Pix</FormLabel>
                <div className="flex-1 flex-col ">
                  <FormControl>
                    {form.watch("pixKeyType") === "EMAIL" ||
                    form.watch("pixKeyType") === "RANDOM" ? (
                      <Input
                        className="input-class bg-background shadow-none rounded-lg p-6"
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    ) : (
                      <InputMask
                        className="input-class bg-background shadow-none rounded-lg p-6"
                        showMask={true}
                        component={Input}
                        mask={customMask(form.watch("pixKeyType"))}
                        replacement={custmReplace(form.watch("pixKeyType"))}
                        placeholder={customMask(form.watch("pixKeyType"))}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="agencyNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col w-full ">
                <FormLabel className="text-[#A3A3A3]">
                  Agência e dígito{" "}
                </FormLabel>
                <div className="flex-1 flex-col ">
                  <FormControl>
                    <InputMask
                      className="input-class bg-background shadow-none rounded-lg p-6"
                      component={Input}
                      {...field}
                      mask="_____-_"
                      value={field.value}
                      replacement={{ _: /./ }}
                      onChange={field.onChange}
                      placeholder="_____-_"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="accountNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col w-full ">
                <FormLabel className="text-[#A3A3A3]">
                  Número da conta e dígito
                </FormLabel>
                <div className="flex-1 flex-col ">
                  <FormControl>
                    <Input
                      className="input-class bg-background shadow-none rounded-lg p-6"
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            name="bankId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col w-full ">
                <FormLabel className="text-[#A3A3A3]">Banco</FormLabel>
                <div className="flex-1 flex-col ">
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="input-class bg-background shadow-none rounded-lg p-6 flex justify-between items-center w-full"
                        >
                          <div className="flex items-center gap-2">
                            {typeof field.value === "string"
                              ? field.value.split(" - ")[1] ||
                                "Selecione o banco"
                              : "Selecione o banco"}
                          </div>

                          <ChevronsUpDown className="opacity-50" size={14} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-fit p-0">
                        <Command>
                          <CommandInput placeholder="Pesquisar banco..." />
                          <CommandList>
                            <CommandEmpty>Nenhum banco encontrado</CommandEmpty>
                            <CommandGroup>
                              {banks.map((bank, idx) => {
                                return (
                                  <CommandItem
                                    key={idx}
                                    value={
                                      bank.bank_code + " - " + bank.long_name
                                    }
                                    onSelect={(currentValue) => {
                                      console.log("Selecionado:", currentValue);
                                      field.onChange(currentValue);
                                      setOpen(false);
                                    }}
                                  >
                                    {bank.bank_code} - {bank.long_name}
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-full p-6 rounded-lg font-bold text-sm"
          onClick={form.handleSubmit(onSubmit)}
          disabled={loadingCreateBankAccount}
        >
          {loadingCreateBankAccount
            ? "Cadastrando..."
            : data
            ? "Editar"
            : "Cadastrar"}
        </Button>
      </div>
    </FormProvider>
  );
};
