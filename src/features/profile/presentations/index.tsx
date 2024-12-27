import { ConfirmAlert } from "@/components/confirm-alert";
import { SectionCard } from "@/components/section-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toPng } from "html-to-image";

import { withLayout } from "@/HOC/withLayout";
import { useProfileCancelAccount } from "../useCases/useProfileCancelAccount";
import { useRecoilValue } from "recoil";
import { profileState } from "../states/atoms";
import { Copy, Download, LoaderCircle, UserRound, X } from "lucide-react";
import { authState } from "@/features/auth/states/atoms";
import { useNavigate } from "react-router-dom";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import ProfileImageUploader from "./components/profile-image-uploader";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import nostrLogo from "@/assets/nostr.png";
import iconLogo from "@/assets/icon.png";
import { formUpdateProfileSchema } from "../schemas/formLoginSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateProfileAccount } from "../useCases/useUpdateProfileUseCase";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import SocialInputField from "./components/social-input-field";
import { useEffect, useRef } from "react";
import { useAuthGetUserUseCase } from "@/features/auth/useCases/useAuthGetUserUseCase";
import { useProfileGetUserInfoUseCase } from "../useCases/useProfileGetUserInfoUseCase";
import { QRCode } from "react-qrcode-logo";

const Profile = () => {
  const { user } = useRecoilValue(authState);
  const { handleCancelAccount } = useProfileCancelAccount();
  const { controller } = useRecoilValue(profileState);
  const {
    isLoadingCancelAccount,
    isLoadingUpdateProfile,
    isLoadingUpdatePhoto,
  } = controller;
  const { successSonner } = useCustomSonner();
  const { updateProfile } = useUpdateProfileAccount();
  const { fetchGetUser } = useAuthGetUserUseCase();
  const navigate = useNavigate();
  const { getUserInfo } = useProfileGetUserInfoUseCase();
  useEffect(() => {
    fetchGetUser(user.id);
  }, []);

  const url = import.meta.env.PROD
    ? import.meta.env.VITE_PRODUCTION_URL
    : import.meta.env.VITE_DEVELOPMENT_URL;
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
    },
  });

  useEffect(() => {
    form.reset({
      username: user.username,
      email: user.email || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      facebookUsername: user.facebookUsername || "",
      instagramUsername: user.instagramUsername || "",
      nostrUsername: user.nostrUsername || "",
      telegramUsername: user.telegramUsername || "",
      whatsappUsername: user.whatsappUsername || "",
      xUsername: user.xUsername || "",
      youtubeUsername: user.youtubeUsername || "",
      twitchUsername: user.twitchUsername || "",
    });
  }, [user]);

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
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    if (qrRef.current) {
      toPng(qrRef.current, { cacheBust: false, pixelRatio: 2 })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${user.username}-qrcode.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Erro ao gerar o QR Code em PNG:", err);
        });
    }
  };

  return (
    <div className="max-w-xl ">
      {/* Dados do perfil */}
      <SectionCard title="Dados do perfil" className="mb-5">
        <div className="flex flex-col space-y-10 ">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="">Foto de perfil</Label>
            </div>
            <div className="flex items-center justify-between">
              <Avatar className="cursor-pointer w-28 h-28 ">
                {isLoadingUpdatePhoto && (
                  <div className="w-full h-full backdrop-blur absolute flex items-center justify-center opacity-70">
                    <LoaderCircle className="w-5 h-5 animate-spin" />
                  </div>
                )}
                <Dialog>
                  <DialogTrigger>
                    <AvatarImage
                      src={user?.photoUrl}
                      className="object-cover"
                    />
                  </DialogTrigger>
                  <DialogContent className="p-0 w-fit">
                    <div className="relative  ">
                      <DialogClose className="absolute right-3 top-3">
                        <X className="w-6 h-6 " />
                      </DialogClose>
                      <img
                        src={user?.photoUrl}
                        alt="Foto de perfil"
                        className="w-[200px] h-[200px] object-cover"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                <AvatarFallback>
                  <UserRound className="h-8 w-8 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div>
                <ProfileImageUploader />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <FormProvider {...form}>
              <div className="flex items-center justify-between">
                <Label htmlFor="">Nome de usuário</Label>
              </div>
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
              <div className="flex items-center justify-between">
                <Label htmlFor="">Nome</Label>
              </div>
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
              <div className="flex items-center justify-between">
                <Label htmlFor="">Sobrenome</Label>
              </div>
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
              <div className="flex items-center justify-between pt-4">
                <Label htmlFor="">E-Mail</Label>
              </div>
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
              <div className="flex items-center justify-between  pt-5">
                <Label htmlFor="">Redes Sociais</Label>
              </div>
              <FormField
                name="youtubeUsername"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SocialInputField
                        iconUrl="youtube"
                        inputProps={{
                          placeholder:
                            "Nome de usuário do Youtube (Ex: /satoshinakamoto)",
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
                name="twitchUsername"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SocialInputField
                        iconUrl="twitch"
                        inputProps={{
                          placeholder:
                            "Nome de usuário da Twitch (Ex: /satoshinakamoto)",
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
                name="facebookUsername"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SocialInputField
                        iconUrl="facebook"
                        inputProps={{
                          placeholder:
                            "Nome de usuário do Facebook (Ex: /satoshinakamoto)",
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
                  <FormItem>
                    <FormControl>
                      <SocialInputField
                        iconUrl="x"
                        inputProps={{
                          placeholder:
                            "Nome de usuário do X (Ex: @satoshinakamoto)",
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
                  <FormItem>
                    <FormControl>
                      <SocialInputField
                        iconUrl="instagram"
                        inputProps={{
                          placeholder:
                            "Nome de usuário do Instagram (Ex: @satoshinakamoto)",
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
                  <FormItem>
                    <FormControl>
                      <SocialInputField
                        iconComponent={
                          <img
                            src={nostrLogo}
                            alt={`nostr icon`}
                            className="w-5 h-5"
                          />
                        }
                        iconUrl="nostr"
                        inputProps={{
                          placeholder: "Insira sua Npub",
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
                  <FormItem>
                    <FormControl>
                      <SocialInputField
                        iconUrl="telegram"
                        inputProps={{
                          placeholder:
                            "Nome de usuário do Telegram (Ex: @satoshinakamoto)",
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
                  <FormItem>
                    <FormControl>
                      <SocialInputField
                        iconUrl="whatsapp"
                        inputProps={{
                          placeholder: "Número do WhatsApp",
                          value: field.value,
                          onChange: field.onChange,
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormProvider>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            className="w-fit flex mt-4"
            variant="default"
            // Só habilita se tiver mudanças no estado
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
      </SectionCard>

      <SectionCard className="mb-5" title="Link público">
        <div className="flex flex-col ">
          <div className="max-w-fit bg-background shadow-sm">
            <div className="border rounded flex items-center ">
              <Button
                className="text-primary"
                variant="link"
                onClick={() => {
                  navigate(`/${user.username}`, {
                    relative: "path",
                  });
                }}
              >
                {url}
                {user.username}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(` ${url}${user.username}`);

                  successSonner("Link copiado com sucesso!");
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </Button>
            </div>
          </div>
        </div>
        <div className=" mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-bold">QR Code </span>
                <Button
                  size="icon"
                  className="w-fit h-fit p-1"
                  onClick={downloadQRCode}
                >
                  <Download size={16} />
                </Button>
              </div>
              <div ref={qrRef} className="p-1">
                <div className="bg-primary mb-10 p-4 rounded-xl h-[280px] w-[200px] flex flex-col items-center justify-center ">
                  <span className="text-white text-sm font-bold mb-2 ">
                    livetip.gg/{user.username}
                  </span>
                  <div className="rounded-lg">
                    <QRCode
                      value={`https://livetip.gg/${user.username}`}
                      size={160}
                      style={{
                        borderRadius: "10px",
                      }}
                      logoImage={iconLogo}
                      logoHeight={20}
                      removeQrCodeBehindLogo
                      bgColor="#ffffff"
                    />
                  </div>

                  <span className="text-white font-bold text-center text-sm mt-2 ">
                    leia o código com a câmera do celular.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Encerrar conta */}
      <SectionCard title="Encerrar conta">
        <span className="my-10 text-muted-foreground">
          Ao encerrar sua conta, você perderá todos os seus dados e não poderá
          mais acessar a plataforma.
        </span>
        <div className="mw-fit">
          <ConfirmAlert
            title="Encerrar conta"
            description="Tem certeza que deseja encerrar sua conta? Essa ação não poderá ser desfeita."
            confirmText="Encerrar conta"
            cancelText="Voltar"
            disabled={isLoadingCancelAccount}
            onConfirm={handleCancelAccount}
          >
            <Button
              variant="destructive_secondary"
              className="w-40 "
              disabled={isLoadingCancelAccount}
            >
              {isLoadingCancelAccount ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                "Encerrar conta"
              )}
            </Button>
          </ConfirmAlert>
        </div>
      </SectionCard>
    </div>
  );
};

const ProfilePage = withLayout(Profile, "LiveTip - Meu Perfil");

export default ProfilePage;
