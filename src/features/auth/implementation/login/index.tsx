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
import { authController, authState } from "../../states/atoms";

import { useAuthLoginUseCase } from "../../useCases/useAuthLoginUseCase";
import { Navigate } from "react-router-dom";
import ButtonLoading from "@/components/button-loader";
import { ModeToggle } from "@/components/mode-toggle";
import { ErrorAlert } from "@/components/error-alert";

const LoginPage: React.FC = () => {
  const { loginType, isLoading, error } = useRecoilValue(authController);

  const { user } = useRecoilValue(authState);

  const { handleLogin } = useAuthLoginUseCase();
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formLoginSchema>) {
    handleLogin(values);
  }

  if (user.token) {
    return <Navigate to="/inicio" />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden  relative">
      <h4 className="absolute top-4 left-4 text-2xl font-bold text-black dark:text-white">
        LiveTip
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
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usuário</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nome de usuario"
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
                            placeholder="Informe sua senha"
                            className="p-5"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                form.handleSubmit(onSubmit)();
                              }
                            }}
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
              </div>
              {error && <ErrorAlert error={error} />}
            </FormProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
