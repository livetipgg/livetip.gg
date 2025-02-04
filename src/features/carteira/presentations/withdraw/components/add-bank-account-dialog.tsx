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

export const AddBankAccountDialog = () => {
  const form = useForm<z.infer<typeof createBankAccountSchema>>({
    resolver: zodResolver(createBankAccountSchema),
    defaultValues: {
      accountDigit: "",
      accountNumber: "",
      agencyDigit: "",
      agencyNumber: "",
      bankId: "",
      fullName: "",
      pixKey: "",
      pixKeyType: "",
      cpf: "",
    },
  });

  const customMask = (value: string) => {
    if (value === "cpf") {
      return "___.___.___-__";
    }
    if (value === "cnpj") {
      return "__.___.___/____-__";
    }
    if (value === "telefone") {
      return "+0 (___) ___-__-__";
    }
    if (value === "aleatorio") {
      return "";
    }
    if (value === "email") {
      return "";
    }
    return "___.___.___-__";
  };

  const custmReplace = (value: string) => {
    if (value === "cpf") {
      return { _: /./ };
    }
    if (value === "cnpj") {
      return { _: /./ };
    }
    if (value === "telefone") {
      return { _: /./ };
    }
    if (value === "aleatorio") {
      return { _: /./ };
    }
    if (value === "email") {
      return { _: /./ };
    }
    return { _: /./ };
  };

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
                          <SelectItem value="cpf">CPF</SelectItem>
                          <SelectItem value="cnpj">CNPJ</SelectItem>
                          <SelectItem value="telefone">Telefone</SelectItem>
                          <SelectItem value="aleatorio">Aleatório</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
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
                    <InputMask
                      className="input-class bg-background shadow-none rounded-lg p-6"
                      showMask={true}
                      component={Input}
                      {...field}
                      mask="_____-_"
                      placeholder="_____-_"
                      replacement={{ _: /./ }}
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
            name="agencyNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col w-full ">
                <FormLabel className="text-[#A3A3A3]">Banco</FormLabel>
                <div className="flex-1 flex-col ">
                  <FormControl>
                    <Select>
                      <SelectTrigger className="shadow-none p-6 rounded-lg border-input">
                        <SelectValue placeholder="Selecione o banco" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Bancos</SelectLabel>
                          <SelectItem value="cpf">CPF</SelectItem>
                          <SelectItem value="cnpj">CNPJ</SelectItem>
                          <SelectItem value="telefone">Telefone</SelectItem>
                          <SelectItem value="aleatorio">Aleatório</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full p-6 rounded-lg font-bold text-sm">
          Cadastrar Conta{" "}
        </Button>
      </div>
    </FormProvider>
  );
};
