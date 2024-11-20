import { useState } from "react";
import { SectionCard } from "@/components/section-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { withLayout } from "@/HOC/withLayout";
import { FormProvider, useForm } from "react-hook-form";
import { formAdminCreateUserSchema } from "../schemas/formLoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useAdminCreateUserUseCase } from "../useCases/useAdminCreateUserUseCase";
import { useRecoilValue } from "recoil";
import { adminState } from "../state/atoms";
import { ErrorAlert } from "@/components/error-alert";

const Admin = () => {
  const { createUser } = useAdminCreateUserUseCase();
  const { controller } = useRecoilValue(adminState);
  const { isLoadingCreateUser, errorCreateUser } = controller;
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof formAdminCreateUserSchema>>({
    resolver: zodResolver(formAdminCreateUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formAdminCreateUserSchema>) {
    try {
      createUser(values.username, values.password, () => {
        setDialogOpen(false);
        form.reset();
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  }

  return (
    <div className="max-w-xl">
      <SectionCard>
        <strong>Criar Usuário</strong>
        <span className="my-10 text-muted-foreground">
          Clique no botão para criar um novo usuário informando o usuario e
          senha para acesso.
        </span>
        <div>
          <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="secondary">Criar Novo Usuário</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Criar Novo Usuário</AlertDialogTitle>
              </AlertDialogHeader>
              <FormProvider {...form}>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col space-y-2 w-full">
                    <FormField
                      name="username"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="bg-card-custom"
                              placeholder="Digite o nome do usuário"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-full">
                    <FormField
                      name="password"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="bg-card-custom"
                              placeholder="Digite a senha do usuário"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </FormProvider>
              {errorCreateUser && <ErrorAlert error={errorCreateUser} />}
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  disabled={isLoadingCreateUser}
                  onClick={(e) => {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)();
                  }}
                >
                  {isLoadingCreateUser ? "Criando..." : "Criar"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </SectionCard>
    </div>
  );
};

const AdminPage = withLayout(Admin, "LiveTip - Painel Admin");
export default AdminPage;
