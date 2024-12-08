import React, { useState } from "react";

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
  FormMessage,
} from "@/components/ui/form";
import { useRecoilValue } from "recoil";
import { authController, authState } from "../../states/atoms";

import { useAuthLoginUseCase } from "../../useCases/useAuthLoginUseCase";
import { Link, Navigate } from "react-router-dom";
import ButtonLoading from "@/components/button-loader";
import { ErrorAlert } from "@/components/error-alert";
import { Eye, EyeOff } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Logotipo } from "@/components/logotipo";

import { useIsMobile } from "@/hooks/use-mobile";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginType, isLoading, error } = useRecoilValue(authController);
  const isMobile = useIsMobile();
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
    <div className="w-full h-screen flex items-center justify-center overflow-hidden  relative  px-2  flex-col ">
      <ModeToggle className="absolute top-4 right-4" />
      <Logotipo classname={`${isMobile ? "w-8" : "w-28"}  absolute top-4 `} />

      <div className="flex items-center justify-center pb-4 ">
        <div className="mx-auto grid w-full max-w-[450px]  ">
          <div className="flex  flex-col mb-5">
            <h1 className="text-2xl font-medium mb-2 text-black dark:text-white">
              Entrar
            </h1>
            <p className="text-muted-foreground text-sm">
              Entre na sua conta utilizando seu nome de usuario e senha
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
                        <FormControl>
                          <Input
                            placeholder="Nome de usuario"
                            {...field}
                            className="p-6 rounded-xl shadow-none border-gray-300 dark:bg-card-custom dark:border-input"
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
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Informe sua senha"
                              className="p-6 rounded-xl shadow-none border-gray-300 dark:bg-card-custom dark:border-input"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  form.handleSubmit(onSubmit)();
                                }
                              }}
                            />
                            <Button
                              size="icon"
                              variant="link"
                              className="absolute top-2 right-2 text-foreground/40"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {isLoading && <ButtonLoading className="rounded-xl p-5" />}
                {!isLoading && (
                  <Button
                    type="submit"
                    className="p-6 rounded-xl hover:bg-secondary"
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
      <span className="text-muted-foreground text-sm mt-2">
        Ainda não possui uma conta?{" "}
        <Link to={"/cadastro"} className="text-primary hover:underline">
          Cadastre-se agora
        </Link>
      </span>
    </div>
  );
};

export default LoginPage;
