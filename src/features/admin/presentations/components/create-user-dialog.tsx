import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { formAdminCreateUserSchema } from "../../schemas/formAdminCreateUserSchema";
import { useAdminCreateUserUseCase } from "../../useCases/useAdminCreateUserUseCase";
import { useRecoilValue } from "recoil";
import { adminState } from "../../state/atoms";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ErrorAlert } from "@/components/error-alert";

export const CreateUserDialog = () => {
  const [, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formAdminCreateUserSchema>>({
    resolver: zodResolver(formAdminCreateUserSchema),
    defaultValues: { username: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof formAdminCreateUserSchema>) {
    try {
      createUser(
        values.username,
        values.password,
        () => {
          setDialogOpen(false);
          form.reset();
        },
        values.password
      );
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  }

  const { createUser } = useAdminCreateUserUseCase();
  const { controller } = useRecoilValue(adminState);
  const { isLoadingCreateUser, errorCreateUser } = controller;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">Criar Novo Usuário</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Criar Novo Usuário</AlertDialogTitle>
        </AlertDialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="input-class"
                        placeholder="Digite o nome do usuário"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="input-class"
                        placeholder="Digite a senha do usuário"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {errorCreateUser && <ErrorAlert error={errorCreateUser} />}
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction type="submit" disabled={isLoadingCreateUser}>
                {isLoadingCreateUser ? "Criando..." : "Criar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
};
