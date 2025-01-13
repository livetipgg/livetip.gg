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
    console.log("values", values);
    const payload = Object.keys(values).reduce((acc, key) => {
      if (values[key] !== user[key] && values["password"] !== " ") {
        console.log("key", key);
        acc[key] = values[key];
      }
      return acc;
    }, {} as z.infer<typeof formUpdateProfileSchema>);

    if (Object.keys(payload).length === 0) {
      return;
    }
    await updateProfile(payload, user.id, () => {
      getUserInfo();
      form.reset();
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
