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
import { Navigate, redirect, useNavigate, useRoutes } from "react-router-dom";
import ButtonLoading from "@/components/button-loader";
import { ErrorAlert } from "@/components/error-alert";
import { Eye, EyeOff } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Logotipo } from "@/components/logotipo";

import { useIsMobile } from "@/hooks/use-mobile";
import { formRegisterSchema } from "../../schemas/formRegisterSchema";
import { useAdminCreateUserUseCase } from "@/features/admin/useCases/useAdminCreateUserUseCase";
import { adminState } from "@/features/admin/state/atoms";

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isMobile = useIsMobile();
  const { controller } = useRecoilValue(adminState);
  const { isLoadingCreateUser, errorCreateUser } = controller;
  const { createUser } = useAdminCreateUserUseCase();
  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof formRegisterSchema>) {
    createUser(
      values.username,
      values.password,
      () => {
        navigate("/");
      },
      values.confirmPassword,
      values.email
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden  relative  px-2  ">
      <ModeToggle className="absolute top-4 right-4" />
      <Logotipo classname={`${isMobile ? "w-8" : "w-28"}  absolute top-4 `} />

      <div className="flex items-center justify-center py-12 ">
        <div className="mx-auto grid w-[350px]  ">
          <div className="flex  flex-col mb-5">
            <h1 className="text-2xl font-medium mb-2 text-black dark:text-white">
              Cadastro
            </h1>
            <p className="text-muted-foreground text-sm">Crie sua conta</p>
          </div>
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
                          className="p-5 rounded-xl shadow-none bg-card-custom"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          className="p-5 rounded-xl shadow-none bg-card-custom"
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
                            className="p-5 rounded-xl shadow-none bg-card-custom"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                form.handleSubmit(onSubmit)();
                              }
                            }}
                          />
                          <Button
                            size="icon"
                            variant="link"
                            className="absolute top-1 right-2 text-foreground/40"
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Informe sua senha"
                            className="p-5 rounded-xl shadow-none bg-card-custom"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                form.handleSubmit(onSubmit)();
                              }
                            }}
                          />
                          <Button
                            size="icon"
                            variant="link"
                            className="absolute top-1 right-2 text-foreground/40"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
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

              {isLoadingCreateUser && (
                <ButtonLoading className="rounded-xl p-5" />
              )}
              {!isLoadingCreateUser && (
                <Button
                  type="submit"
                  className="w-full bg-secondary text-white p-5 rounded-xl "
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Criar Conta
                </Button>
              )}
            </div>
            {errorCreateUser && <ErrorAlert error={errorCreateUser} />}
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
