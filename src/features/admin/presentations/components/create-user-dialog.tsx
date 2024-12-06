import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { formAdminCreateUserSchema } from "../../schemas/formAdminCreateUserSchema";
import { useAdminCreateUserUseCase } from "../../useCases/useAdminCreateUserUseCase";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ErrorAlert } from "@/components/error-alert";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const CreateUserDialog = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formAdminCreateUserSchema>>({
    resolver: zodResolver(formAdminCreateUserSchema),
    defaultValues: { username: "", password: "", email: "" },
  });

  const mutation = useMutation({
    mutationKey: ["admin_users"],
    mutationFn: (values: z.infer<typeof formAdminCreateUserSchema>) => {
      return createUser(
        values.username,
        values.password,
        () => {
          form.reset();
        },
        values.password,
        values.email
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["admin_users"],
      });
    },
  });

  const { isPending, isError, error } = mutation;
  const { createUser } = useAdminCreateUserUseCase();

  async function onSubmit(values: z.infer<typeof formAdminCreateUserSchema>) {
    await mutation.mutateAsync(values);
  }

  return (
    <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus size={16} className="mr-2" />
          Criar Novo Usuário
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criar Usuário</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para criar um novo usuário.
          </SheetDescription>
        </SheetHeader>
        {isError && <ErrorAlert error={error.message} />}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between mt-4">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex w-full items-center">
                    <FormLabel className="w-1/4 text-left">Username</FormLabel>
                    <div className="flex-1 flex-col ml-4">
                      <FormControl>
                        <Input
                          {...field}
                          className="input-class"
                          placeholder="Digite o nome do usuário"
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
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex w-full items-center">
                    <FormLabel className="w-1/4 text-left">Email</FormLabel>

                    <FormControl className="flex-1 ml-4">
                      <Input
                        {...field}
                        className="input-class"
                        placeholder="Digite o email do usuário"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex w-full items-center">
                    <FormLabel className="w-1/4 text-left">Senha</FormLabel>

                    <div className="flex-1 flex-col ml-4">
                      <FormControl>
                        <Input
                          {...field}
                          className="input-class"
                          placeholder="Digite a senha do usuário"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </FormProvider>
        <SheetFooter className="mt-4">
          <Button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {isPending ? "Criando..." : "Salvar"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
