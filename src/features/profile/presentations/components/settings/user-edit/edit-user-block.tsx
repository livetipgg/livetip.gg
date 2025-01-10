import { authState } from "@/features/auth/states/atoms";
import { useRecoilValue } from "recoil";
import { EditUserPhotoBlock } from "./components/edit-user-photo-block";
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
import { formUpdateProfileSchema } from "@/features/profile/schemas/formLoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useUpdateProfileAccount } from "@/features/profile/useCases/useUpdateProfileUseCase";
import { useProfileGetUserInfoUseCase } from "@/features/profile/useCases/useProfileGetUserInfoUseCase";
import { profileState } from "@/features/profile/states/atoms";

export const EditUserBlock = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const { updateProfile } = useUpdateProfileAccount();
  const { getUserInfo } = useProfileGetUserInfoUseCase();
  const { controller } = useRecoilValue(profileState);
  const { isLoadingUpdateProfile } = controller;

  const { user } = useRecoilValue(authState);

  const form = useForm<z.infer<typeof formUpdateProfileSchema>>({
    resolver: zodResolver(formUpdateProfileSchema),
    defaultValues: {
      username: user.username,
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      youtubeUsername: user.youtubeUsername || "",
      twitchUsername: user.twitchUsername || "",
      facebookUsername: user.facebookUsername || "",
      instagramUsername: user.instagramUsername || "",
      nostrUsername: user.nostrUsername || "",
      telegramUsername: user.telegramUsername || "",
      whatsappUsername: user.whatsappUsername || "",
      xUsername: user.xUsername || "",
      password: "",
    },
  });

  const saveDisabled = form.formState.isSubmitting || !form.formState.isDirty;
  async function onSubmit(values: z.infer<typeof formUpdateProfileSchema>) {
    // pega só o campo que mudou de valor
    const payload = Object.keys(values).reduce((acc, key) => {
      if (values[key] !== user[key]) {
        acc[key] = values[key];
      }
      return acc;
    }, {} as z.infer<typeof formUpdateProfileSchema>);

    if (Object.keys(payload).length === 0) {
      return;
    }

    await updateProfile(payload, user.id, () => {
      getUserInfo();
    });
  }

  return (
    <div>
      <TabContentBlock>
        <EditUserPhotoBlock user={user} />
      </TabContentBlock>
      <FormProvider {...form}>
        <TabContentBlock>
          <span className="font-medium text-sm">Nome Completo</span>
          <div className="flex flex-1 gap-2 flex-col md:flex-row">
            <div className="flex flex-col flex-1 gap-1">
              <Label htmlFor="" className="text-muted-foreground">
                Nome
              </Label>
              <FormField
                name="first_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="p-5 rounded-lg bg-background shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <Label htmlFor="" className="text-muted-foreground">
                Sobrenome
              </Label>
              <FormField
                name="last_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="p-5 rounded-lg bg-background shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </TabContentBlock>
        <TabContentBlock>
          <span className="font-medium text-sm">Usuário</span>
          <div className="flex flex-1 gap-2 flex-col md:flex-row">
            <div className="flex flex-col flex-1 gap-1">
              <Label htmlFor="" className="text-muted-foreground">
                Nome de Usuário
              </Label>
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="p-5 rounded-lg bg-background shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </TabContentBlock>
        <TabContentBlock>
          {/* Email */}
          <span className="font-medium text-sm">Email</span>
          <div className="flex flex-1 gap-2 flex-col md:flex-row">
            <div className="flex flex-col flex-1 gap-1">
              <Label htmlFor="" className="text-muted-foreground">
                Email
              </Label>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="p-5 rounded-lg bg-background shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </TabContentBlock>
        <TabContentBlock>
          {/* Email */}
          <div className="flex flex-col">
            <span className="font-medium text-sm">Senha</span>
            <span className="text-muted-foreground text-sm">
              Altere sua senha.
            </span>
          </div>
          {/* current passowrd, new password, confirmNewPassword */}
          <div className="flex flex-1 gap-2 flex-col md:flex-row">
            <div className="flex flex-col flex-1 gap-1">
              <Label htmlFor="" className="text-muted-foreground">
                Senha Atual
              </Label>
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showCurrentPassword ? "text" : "password"}
                          className="p-5 rounded-lg bg-background shadow-none"
                        />
                        <Button
                          size="icon"
                          variant="link"
                          className="absolute top-1 right-2 text-foreground/40"
                          onClick={() => {
                            console.log(
                              "showCurrentPassword",
                              showCurrentPassword
                            );
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
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showNewPassword ? "text" : "password"}
                          className="p-5 rounded-lg bg-background shadow-none"
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
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmNewPassword ? "text" : "password"}
                          className="p-5 rounded-lg bg-background shadow-none"
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
              disabled={saveDisabled}
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
