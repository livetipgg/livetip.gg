import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createBankAccountSchema } from "@/features/carteira/schemas/createBankAccountSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

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
    },
  });
  return (
    <FormProvider {...form}>
      <div className="flex items-center justify-between mt-4">
        <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col w-full ">
              <FormLabel className="">Nome Completo</FormLabel>
              <div className="flex-1 flex-col ">
                <FormControl>
                  <Input
                    {...field}
                    className="input-class bg-background rounded-lg p-5"
                    placeholder="Digite seu nome completo"
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-2">
        <div className="flex items-center justify-between mt-4 flex-1">
          <FormField
            name="agencyNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col w-full ">
                <FormLabel className="">Agência</FormLabel>
                <div className="flex-1 flex-col ">
                  <FormControl>
                    <Input
                      {...field}
                      className="input-class bg-background rounded-lg p-5"
                      placeholder="XXXX"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <FormField
            name="agencyDigit"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col w-full ">
                <FormLabel className="">Dígito</FormLabel>
                <div className="flex-1 flex-col ">
                  <FormControl>
                    <Input
                      {...field}
                      className="input-class bg-background rounded-lg p-5 max-w-20"
                      placeholder="X"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex items-center justify-between mt-4 flex-1">
          <FormField
            name="accountNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col w-full ">
                <FormLabel className="">Conta bancária</FormLabel>
                <div className="flex-1 flex-col ">
                  <FormControl>
                    <Input
                      {...field}
                      className="input-class bg-background rounded-lg p-5"
                      placeholder="XXXXXX"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <FormField
            name="accountDigit"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col w-full ">
                <FormLabel className="">Dígito</FormLabel>
                <div className="flex-1 flex-col ">
                  <FormControl>
                    <Input
                      {...field}
                      className="input-class bg-background rounded-lg p-5 max-w-20"
                      placeholder="X"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </FormProvider>
  );
};
