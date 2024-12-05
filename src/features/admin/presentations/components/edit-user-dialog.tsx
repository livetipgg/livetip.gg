/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";

import { useState } from "react";
import nostrLogo from "@/assets/nostr.png";

import { Pen } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuthGetUserUseCase } from "@/features/auth/useCases/useAuthGetUserUseCase";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { formAdminEditUserSchema } from "../../schemas/formAdminEditUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SocialInputField from "@/features/profile/presentations/components/social-input-field";
import { useRecoilValue } from "recoil";
import { useUpdateProfileAccount } from "@/features/profile/useCases/useUpdateProfileUseCase";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { profileState } from "@/features/profile/states/atoms";
import { useAdminGetAllUsersUseCase } from "../../useCases/useAdminGetAllUsersUseCase";

export const EditUserDialog = ({ id }: { id: number }) => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { controller } = useRecoilValue(profileState);
  const { isLoadingUpdateProfile } = controller;
  const [dialogOpen, setDialogOpen] = useState(false);
  const { getUser } = useAuthGetUserUseCase();
  const { getAllUsers } = useAdminGetAllUsersUseCase();
  const { updateProfile } = useUpdateProfileAccount();

  const form = useForm<z.infer<typeof formAdminEditUserSchema>>({
    resolver: zodResolver(formAdminEditUserSchema),
    defaultValues: {
      username: "",
      email: "",
      photoUrl: null,
      facebookUsername: "",
      instagramUsername: "",
      nostrUsername: "",
      telegramUsername: "",
      whatsappUsername: "",
      xUsername: "",
    },
  });

  // const inputFileRef = useRef<HTMLInputElement>(null);

  // const handleClick = () => {
  //   inputFileRef.current?.click();
  // };

  // const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files?.[0];
  //   if (selectedFile) {
  //     form.setValue("photoUrl", URL.createObjectURL(selectedFile));
  //   }
  // };

  const { successSonner } = useCustomSonner();

  async function onSubmit(values: z.infer<typeof formAdminEditUserSchema>) {
    const payload = Object.entries(values).reduce((acc, [key, value]) => {
      if (value !== selectedUser[key]) {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (Object.keys(payload).length === 0) {
      successSonner("Nenhum campo foi alterado");
      return;
    }

    await updateProfile(payload, id);
    await getAllUsers({
      limit: 10,
      page: 1,
    });
    setDialogOpen(false);
    form.reset();
  }

  return (
    <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            getUser(id).then((user) => {
              setSelectedUser(user);
              form.reset({
                username: user.username,
                email: user.email,
                photoUrl: user.photoUrl,
                facebookUsername: user.facebookUsername || "",
                instagramUsername: user.instagramUsername || "",
                nostrUsername: user.nostrUsername || "",
                telegramUsername: user.telegramUsername || "",
                whatsappUsername: user.whatsappUsername || "",
                xUsername: user.xUsername || "",
              });
              setDialogOpen(true);
            });
          }}
        >
          <Pen size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Usuário</SheetTitle>
          <SheetDescription>Edite as informações do usuário</SheetDescription>
        </SheetHeader>
        <FormProvider {...form}>
          <form className="flex flex-col mt-4">
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex w-full items-center">
                    <FormLabel className="w-1/4 text-left">Username</FormLabel>
                    <FormControl className="flex-1 ml-4">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex w-full items-center">
                    <FormLabel className="w-1/4 text-left">Email</FormLabel>
                    <FormControl className="flex-1 ml-4">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <div className="flex items-center justify-between mt-4">
              <FormField
                control={form.control}
                name="photoUrl"
                render={({ field }) => (
                  <FormItem className="flex w-full ">
                    <FormLabel className="w-1/4 text-left">Photo URL</FormLabel>
                    <FormControl className=" ml-4 ">
                      <div
                        onClick={handleClick}
                        className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-400 cursor-pointer hover:bg-card-custom p-1"
                      >
                        {!field.value && (
                          <Upload className="w-6 h-6 text-primary" />
                        )}
                        {field.value && (
                          <img
                            src={field.value}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded"
                          />
                        )}
                        <input
                          type="file"
                          ref={inputFileRef}
                          onChange={onFileChange}
                          className="hidden"
                          accept="image/png, image/jpeg, image/jpg"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
            <div className="flex items-center flex-col mt-4">
              <FormField
                name="facebookUsername"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <SocialInputField
                        iconUrl="facebook"
                        inputProps={{
                          placeholder: "Nome de usuário do Facebook",
                          value: field.value,
                          onChange: field.onChange,
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="instagramUsername"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <SocialInputField
                        iconUrl="instagram"
                        inputProps={{
                          placeholder: "Nome de usuário do Instagram",
                          value: field.value,
                          onChange: field.onChange,
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="nostrUsername"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <SocialInputField
                        iconComponent={
                          <img
                            src={nostrLogo}
                            alt={`nostr icon`}
                            className="w-6 h-6 object-contain"
                          />
                        }
                        iconUrl="nostr"
                        inputProps={{
                          placeholder: "Nome de usuário do Nostr",
                          value: field.value,
                          onChange: field.onChange,
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="telegramUsername"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <SocialInputField
                        iconUrl="telegram"
                        inputProps={{
                          placeholder: "Nome de usuário do Telegram",
                          value: field.value,
                          onChange: field.onChange,
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="whatsappUsername"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <SocialInputField
                        iconUrl="whatsapp"
                        inputProps={{
                          placeholder: "Nome de usuário do WhatsApp",
                          value: field.value,
                          onChange: field.onChange,
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="xUsername"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <SocialInputField
                        iconUrl="x"
                        inputProps={{
                          placeholder: "Nome de usuário do X",
                          value: field.value,
                          onChange: field.onChange,
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </FormProvider>
        <SheetFooter className="mt-4">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoadingUpdateProfile}
          >
            {isLoadingUpdateProfile ? "Salvando..." : "Editar"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
