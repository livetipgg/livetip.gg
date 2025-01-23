import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRecoilValue } from "recoil";

import { Link, useNavigate } from "react-router-dom";
import ButtonLoading from "@/components/button-loader";
import { ErrorAlert } from "@/components/error-alert";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { formRegisterSchema } from "../../schemas/formRegisterSchema";
import { useAdminCreateUserUseCase } from "@/features/admin/useCases/useAdminCreateUserUseCase";
import { adminState } from "@/features/admin/state/atoms";
import { useAuthLogoutUseCase } from "../../useCases/useAuthLogoutUseCase";
import { HelpButton } from "../components/help-button";
import AuthLayout from "../auth-layout";
import { useProfileVerifyEmailUseCase } from "@/features/profile/useCases/useProfileVerifyEmailUseCase";
import { profileState } from "@/features/profile/states/atoms";

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [resendCodeCountdown, setResendCoderesendCodeCountdown] = useState(60);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { controller } = useRecoilValue(adminState);
  const { isLoadingCreateUser, errorCreateUser } = controller;
  const { createUser } = useAdminCreateUserUseCase();
  const { handleLogout } = useAuthLogoutUseCase();
  const [otp, setOtp] = useState("");
  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
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
        handleLogout();
        navigate("/");
      },
      values.confirmPassword,
      values.email,
      values.first_name,
      values.last_name,
      otp
    );
  }

  // atualiza o contador de reenvio de código
  useEffect(() => {
    if (resendCodeCountdown > 0) {
      const interval = setInterval(() => {
        setResendCoderesendCodeCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendCodeCountdown]);

  const [registerSteps, setRegisterSteps] = useState("USER_DATA");

  const { sendCodeToEmail } = useProfileVerifyEmailUseCase();
  const { controller: profileController } = useRecoilValue(profileState);
  const { isLoadingSendCodeToEmail } = profileController;

  const isPasswordValid =
    form.watch("password") === form.watch("confirmPassword");

  return (
    <AuthLayout>
      <div className="w-full h-screen flex items-center justify-center overflow-hidden  relative  px-2  ">
        <div className="flex items-center justify-center py-12 ">
          <div className="mx-auto grid w-[350px]  ">
            {registerSteps === "VERIFY_EMAIL" && (
              <div>
                <div className="flex  flex-col mb-5">
                  <Button
                    variant="link"
                    onClick={() => setRegisterSteps("USER_DATA")}
                    className="w-fit justify-start px-0 gap-2 "
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Voltar
                  </Button>
                  <h1 className="text-2xl font-medium mb-2 text-black dark:text-white">
                    Confirmar email
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Mandamos um código de confirmação para o seu email{" "}
                    <span className="text-primary">{form.watch("email")}</span>
                  </p>
                  <div className="mt-4">
                    <InputOTP
                      pattern={REGEXP_ONLY_DIGITS}
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup className="flex-1">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <Button
                      variant="link"
                      disabled={resendCodeCountdown > 0}
                      className="text-primary w-full gap-2"
                      onClick={() => {
                        sendCodeToEmail(form.watch("email"), () => {
                          setResendCoderesendCodeCountdown(60);
                        });
                      }}
                    >
                      Reenviar Código
                      {resendCodeCountdown > 0 && (
                        <span>({resendCodeCountdown}s)</span>
                      )}
                    </Button>

                    {isLoadingCreateUser && (
                      <ButtonLoading className="rounded-xl p-5" />
                    )}

                    {!isLoadingCreateUser && (
                      <Button
                        className="p-6 rounded-xl mt-4 hover:bg-secondary flex-1 w-full"
                        disabled={otp.length < 6}
                        onClick={form.handleSubmit(onSubmit)}
                      >
                        Confirmar
                      </Button>
                    )}
                    {errorCreateUser && <ErrorAlert error={errorCreateUser} />}
                  </div>
                </div>
              </div>
            )}
            {registerSteps === "USER_DATA" && (
              <>
                <div className="flex  flex-col mb-5">
                  <h1 className="text-2xl font-medium mb-2 text-black dark:text-white">
                    Cadastro
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Crie sua conta
                  </p>
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
                                onChange={(e) => {
                                  // limita o tamanho do username para 30 caracteres
                                  if (e.target.value.length > 30) {
                                    e.target.value = e.target.value.slice(
                                      0,
                                      30
                                    );
                                  }
                                }}
                                className="p-6 rounded-xl shadow-none border-gray-300 bg-white dark:bg-card-custom dark:border-input"
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
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Nome"
                                {...field}
                                className="p-6 rounded-xl shadow-none border-gray-300 bg-white dark:bg-card-custom dark:border-input"
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
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Sobrenome"
                                {...field}
                                className="p-6 rounded-xl shadow-none border-gray-300 bg-white dark:bg-card-custom dark:border-input"
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
                                className="p-6 rounded-xl shadow-none border-gray-300 bg-white dark:bg-card-custom dark:border-input"
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
                                  className="p-6 rounded-xl shadow-none border-gray-300 bg-white dark:bg-card-custom dark:border-input"
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
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  placeholder="Confirme sua senha"
                                  className="p-6 rounded-xl shadow-none border-gray-300 bg-white dark:bg-card-custom dark:border-input"
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

                    {isLoadingSendCodeToEmail && (
                      <ButtonLoading className="rounded-xl p-5" />
                    )}
                    {!isLoadingSendCodeToEmail && (
                      <Button
                        type="submit"
                        disabled={!form.formState.isValid || !isPasswordValid}
                        className="p-6 rounded-xl hover:bg-secondary"
                        onClick={() => {
                          sendCodeToEmail(form.watch("email"), () => {
                            setRegisterSteps("VERIFY_EMAIL");
                            setOtp("");
                          });
                        }}
                      >
                        Criar Conta
                      </Button>
                    )}
                  </div>
                  {errorCreateUser && <ErrorAlert error={errorCreateUser} />}
                </FormProvider>
              </>
            )}

            <span className="text-muted-foreground text-sm mt-4 text-center">
              Já tem uma conta?{" "}
              <Link to={"/"} className="text-primary hover:underline">
                Entrar
              </Link>
            </span>
          </div>

          <HelpButton />
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
