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
import { useRecoilValue } from "recoil";
import { adminState } from "../../state/atoms";
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
import { useAdminGetAllUsersUseCase } from "../../useCases/useAdminGetAllUsersUseCase";

export const CreateUserDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formAdminCreateUserSchema>>({
    resolver: zodResolver(formAdminCreateUserSchema),
    defaultValues: { username: "", password: "", email: "" },
  });

  async function onSubmit(values: z.infer<typeof formAdminCreateUserSchema>) {
    try {
      createUser(
        values.username,
        values.password,
        () => {
          form.reset();
        },
        values.password,
        values.email
      );
      getAllUsers({ limit: 10, page: 1 });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  }

  const { createUser } = useAdminCreateUserUseCase();
  const { controller } = useRecoilValue(adminState);
  const { isLoadingCreateUser, errorCreateUser } = controller;
  const { getAllUsers } = useAdminGetAllUsersUseCase();

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
        {errorCreateUser && <ErrorAlert error={errorCreateUser} />}

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between mt-4">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex w-full items-center">
                    <FormLabel className="w-1/4 text-left">Username</FormLabel>

                    <FormControl className="flex-1 ml-4">
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

                    <FormControl className="flex-1 ml-4">
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
          </form>
        </FormProvider>
        <SheetFooter className="mt-4">
          <Button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoadingCreateUser || !form.formState.isValid}
          >
            {isLoadingCreateUser ? "Criando..." : "Salvar"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    // <AlertDialog>
    //   <AlertDialogTrigger asChild>
    //     <Button variant="secondary">Criar Novo Usuário</Button>
    //   </AlertDialogTrigger>
    //   <AlertDialogContent>
    //     <AlertDialogHeader>
    //       <AlertDialogTitle>Criar Novo Usuário</AlertDialogTitle>
    //     </AlertDialogHeader>

    //   </AlertDialogContent>
    // </AlertDialog>
  );
};
