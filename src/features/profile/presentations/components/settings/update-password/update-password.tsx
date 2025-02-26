import { useRecoilValue } from "recoil";
import { TabContentBlock } from "../tabs-settings-root";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { profileState } from "@/features/profile/states/atoms";
import { formUpdatePassword } from "@/features/profile/schemas/formUpdatePassword";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { useUpdatePasswordUseCase } from "@/features/profile/useCases/useUpdatePasswordUseCase";

export const UpdateUserPasswordBlock = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const { successSonner, errorSonner } = useCustomSonner();
  const { updatePassword } = useUpdatePasswordUseCase();

  const { controller } = useRecoilValue(profileState);
  const { isLoadingUpdateProfile } = controller;

  const form = useForm<z.infer<typeof formUpdatePassword>>({
    resolver: zodResolver(formUpdatePassword),
    defaultValues: {
      confirmNewPassword: "",
      currentPassword: "",
      newPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formUpdatePassword>) {
    //
    if (values.newPassword !== values.confirmNewPassword) {
      errorSonner("As senhas não coincidem");
      return;
    }

    updatePassword(
      {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      undefined,
      () => {
        form.reset();
        successSonner("Senha atualizada com sucesso!");
      }
    );
  }

  return (
    <div>
      <FormProvider {...form}>
        <TabContentBlock>
          <div className="flex flex-col">
            <span className="font-medium text-sm">Senha</span>
            <span className="text-muted-foreground text-sm">
              Altere sua senha.
            </span>
          </div>
          <div className="flex flex-1 gap-2 flex-col md:flex-row">
            <div className="flex flex-col flex-1 gap-1">
              <Label htmlFor="" className="text-muted-foreground">
                Senha Atual
              </Label>
              <FormField
                name="currentPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showCurrentPassword ? "text" : "password"}
                          className="p-5 rounded-lg bg-card-custom shadow-none"
                        />
                        <Button
                          size="icon"
                          variant="link"
                          className="absolute top-1 right-2 text-foreground/40"
                          onClick={() => {
                            setShowCurrentPassword(!showCurrentPassword);
                          }}
                        >
                          {showCurrentPassword ? (
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
            <div className="flex flex-col flex-1 gap-1">
              <Label htmlFor="" className="text-muted-foreground">
                Nova Senha
              </Label>
              <FormField
                name="newPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showNewPassword ? "text" : "password"}
                          className="p-5 rounded-lg bg-card-custom shadow-none"
                        />
                        <Button
                          size="icon"
                          variant="link"
                          className="absolute top-1 right-2 text-foreground/40"
                          onClick={() => {
                            setShowNewPassword(!showNewPassword);
                          }}
                        >
                          {showNewPassword ? (
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
            <div className="flex flex-col flex-1 gap-1">
              <Label htmlFor="" className="text-muted-foreground">
                Confirmar Nova Senha
              </Label>
              <FormField
                name="confirmNewPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmNewPassword ? "text" : "password"}
                          className="p-5 rounded-lg bg-card-custom shadow-none"
                        />
                        <Button
                          size="icon"
                          variant="link"
                          className="absolute top-1 right-2 text-foreground/40"
                          onClick={() => {
                            setShowConfirmNewPassword(!showConfirmNewPassword);
                          }}
                        >
                          {showConfirmNewPassword ? (
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
          </div>
        </TabContentBlock>
        <TabContentBlock>
          <div className="flex items-center justify-end gap-2">
            <Button
              className="w-fit flex mt-4"
              variant="default"
              onClick={form.handleSubmit(onSubmit)}
            >
              {isLoadingUpdateProfile ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </div>
        </TabContentBlock>
      </FormProvider>
    </div>
  );
};
