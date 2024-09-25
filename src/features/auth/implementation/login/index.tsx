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
import { Navigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import ButtonLoading from "@/components/button-loader";
import { ModeToggle } from "@/components/mode-toggle";
const LoginPage: React.FC = () => {
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
  }

  const { theme } = useTheme();
  console.log("theme", theme);
  if (isAuthenticated) {
    return <Navigate to="/inicio" />;
  }
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <h4 className="text-xl font-bold  text-black dark:text-white absolute top-5 left-5">
          Logotipo
        </h4>
      </div>
      <div className="w-full h-screen flex items-center justify-center overflow-hidden  relative">
        {/* Logotipo */}
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px]  ">
            <div className="flex justify-center items-center flex-col mb-5">
              <h1 className="text-2xl font-bold text-black dark:text-white">
                Faça login
              </h1>
              <p className="text-muted-foreground text-sm">
                Acesse sua conta para acessar o painel de controle
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
                            <Input placeholder="email@gmail.com" {...field} />
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
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Esqueci minha senha */}
                  <div className="flex justify-end">
                    <Button variant="link" className="p-0 m-0">
                      Esqueci minha senha
                    </Button>
                  </div>
                  {isLoading && <ButtonLoading />}
                  {!isLoading && (
                    <Button
                      variant={"secondary"}
                      type="submit"
                      className="w-full"
                      onClick={form.handleSubmit(onSubmit)}
                    >
                      Entrar
                    </Button>
                  )}
                </div>
              </FormProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
