/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useUpdateProfileAccount } from "@/features/profile/useCases/useUpdateProfileUseCase";
import { useProfileGetUserInfoUseCase } from "@/features/profile/useCases/useProfileGetUserInfoUseCase";
import { profileState } from "@/features/profile/states/atoms";
import SocialInputField from "../../social-input-field";
import nostrLogo from "@/assets/nostr.png";
import { useEffect } from "react";
import webLogo from "@/assets/web.png";
import { VerifyEmailDialog } from "./components/verify-email-dialog";

const socialFields: Array<{
  name:
    | "youtubeUsername"
    | "twitchUsername"
    | "facebookUsername"
    | "instagramUsername"
    | "xUsername"
    | "nostrUsername"
    | "telegramUsername"
    | "whatsappUsername"
    | "websiteLink";
  label: string;
  placeholder: string;
  icon?: string;
  iconComponent?: JSX.Element;
  urlBase?: string;
}> = [
  {
    name: "youtubeUsername",
    label: "YouTube",
    placeholder: "Nome de usuário do YouTube",
    icon: "youtube",
    urlBase: "https://www.youtube.com/",
  },
  {
    name: "twitchUsername",
    label: "Twitch",
    placeholder: "Nome de usuário da Twitch",
    icon: "twitch",
    urlBase: "https://www.twitch.tv/",
  },
  {
    name: "xUsername",
    label: "X",
    placeholder: "Nome de usuário do X",
    icon: "x",
    urlBase: "https://x.com/",
  },
  {
    name: "facebookUsername",
    label: "Facebook",
    placeholder: "Nome de usuário do Facebook",
    icon: "facebook",
    urlBase: "https://www.facebook.com/",
  },
  {
    name: "instagramUsername",
    label: "Instagram",
    placeholder: "Nome de usuário do Instagram",
    icon: "instagram",
    urlBase: "https://www.instagram.com/",
  },
  {
    name: "nostrUsername",
    label: "Nostr",
    placeholder: "Insira sua Npub",
    iconComponent: <img src={nostrLogo} alt="nostr" className="w-5 h-5" />,
    urlBase: "https://njump.me/",
  },
  {
    name: "telegramUsername",
    label: "Telegram",
    placeholder: "Nome de usuário do Telegram",
    icon: "telegram",
    urlBase: "https://t.me/",
  },
  {
    name: "whatsappUsername",
    label: "WhatsApp",
    placeholder: "Número do WhatsApp",
    icon: "whatsapp",
    urlBase: "https://wa.me/",
  },
  {
    name: "websiteLink",
    label: "Web",
    placeholder: "Insira sua URL",
    iconComponent: <img src={webLogo} alt="web" className="w-5 h-5" />,
    urlBase: "",
  },
];

export const EditUserBlock = () => {
  const { updateProfile } = useUpdateProfileAccount();
  const { getUserInfo } = useProfileGetUserInfoUseCase();
  const { controller } = useRecoilValue(profileState);
  const { isLoadingUpdateProfile } = controller;

  const { user } = useRecoilValue(authState);

  const form = useForm<z.infer<typeof formUpdateProfileSchema>>({
    resolver: zodResolver(formUpdateProfileSchema),
    defaultValues: {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      youtubeUsername: user.youtubeUsername,
      twitchUsername: user.twitchUsername,
      facebookUsername: user.facebookUsername,
      instagramUsername: user.instagramUsername,
      nostrUsername: user.nostrUsername,
      telegramUsername: user.telegramUsername,
      whatsappUsername: user.whatsappUsername,
      xUsername: user.xUsername,
      websiteLink: user.websiteLink,
      password: "",
    },
  });

  useEffect(() => {
    form.reset({
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      youtubeUsername: user.youtubeUsername,
      twitchUsername: user.twitchUsername,
      facebookUsername: user.facebookUsername,
      instagramUsername: user.instagramUsername,
      nostrUsername: user.nostrUsername,
      telegramUsername: user.telegramUsername,
      whatsappUsername: user.whatsappUsername,
      xUsername: user.xUsername,
      websiteLink: user.websiteLink,
      password: "",
    });
  }, [user]);

  const saveDisabled = form.formState.isSubmitting || !form.formState.isDirty;

  const processFormPayload = (
    values: z.infer<typeof formUpdateProfileSchema>,
    user: any
  ) => {
    return Object.entries(values).reduce((acc, [key, value]) => {
      const userValue = user[key];
      if (key === "password") {
        if (value && value !== userValue) acc[key] = value;
      } else if (value !== userValue) {
        acc[key] = value;
      }
      return acc;
    }, {});
  };

  async function onSubmit(values: z.infer<typeof formUpdateProfileSchema>) {
    const payload = processFormPayload(values, user);

    if (Object.keys(payload).length === 0) return;

    try {
      await updateProfile(payload, user.id, () => {
        getUserInfo();
        form.reset();
      });
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
    }
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
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">Email</span>
            <VerifyEmailDialog />
          </div>

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
          <span className="font-medium text-sm">Redes Sociais</span>
          {socialFields.map(
            ({ name, placeholder, icon, iconComponent, urlBase }) => (
              <FormField
                key={name}
                name={name}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2 flex-1">
                        <SocialInputField
                          iconUrl={icon}
                          iconComponent={iconComponent}
                          inputProps={{
                            placeholder,
                            value: field.value,
                            onChange: field.onChange,
                          }}
                        />
                        <Button
                          className="p-2"
                          variant="outline"
                          onClick={() => {
                            const fullUrl = urlBase
                              ? `${urlBase}${field.value}`
                              : field.value;
                            window.open(fullUrl, "_blank");
                          }}
                          disabled={!field.value} // Disable if the input is empty
                        >
                          Ver Link
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          )}
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
