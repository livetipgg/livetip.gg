import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema } from "../../schemas/formLoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRecoilValue } from "recoil";
import { authController } from "../../states/atoms";

import { useAuthLoginUseCase } from "../../useCases/useAuthLoginUseCase";
import { Navigate, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import ButtonLoading from "@/components/button-loader";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginType, isLoading, isAuthenticated } =
    useRecoilValue(authController);

  const { handleLogin } = useAuthLoginUseCase();
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formLoginSchema>) {
    handleLogin(values);

    navigate("/inicio");
  }

  const { theme } = useTheme();
  console.log("theme", theme);
  if (isAuthenticated) {
    return <Navigate to="/inicio" />;
  }
  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden  relative">
      {/* Logotipo */}
      <h4 className="absolute top-4 left-4 text-2xl font-bold text-black dark:text-white">
        LiveChat
      </h4>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px]  ">
          <div className="flex justify-center items-center flex-col mb-5">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Olá!
            </h1>
            <p className="text-muted-foreground text-sm">
              Digite seu e-mail e senha para entrar
            </p>
          </div>
          {loginType === "credencials" && (
            <FormProvider {...form}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="email@gmail.com"
                            {...field}
                            className="p-5"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="*****"
                            className="p-5"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {isLoading && <ButtonLoading />}
                {!isLoading && (
                  <Button
                    variant={"secondary"}
                    type="submit"
                    className="w-full text-white p-5"
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Entrar
                  </Button>
                )}

                {/* <div className="flex justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" className="p-0 m-0">
                        Esqueci minha senha
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Recuperação de senha</DialogTitle>
                        <DialogDescription>
                          Digite seu e-mail que enviaremos uma nova senha para
                          você.
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        <Input
                          placeholder="Informe seu e-mail"
                          className="p-5"
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          variant="secondary"
                          className="w-full text-white p-5"
                        >
                          Enviar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div> */}
              </div>
            </FormProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
