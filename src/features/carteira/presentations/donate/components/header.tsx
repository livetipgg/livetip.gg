import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { paymentDonateState } from "@/features/carteira/states/atoms";
import { BadgeCheck, User } from "lucide-react";
import { useRecoilValue } from "recoil";
import nostrLogo from "@/assets/nostr.png";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

const socialLinks = [
  {
    field: "instagramUsername",
    icon: "instagram",
    urlBase: "https://www.instagram.com/",
  },
  {
    field: "facebookUsername",
    icon: "facebook",
    urlBase: "https://www.facebook.com/",
  },
  {
    field: "nostrUsername",
    icon: null,
    iconComponent: (
      <img src={nostrLogo} alt={`nostr icon`} className="w-5 h-5" />
    ),
    urlBase: "https://njump.me/",
  },
  {
    field: "telegramUsername",
    icon: "telegram",
    urlBase: "https://t.me/",
  },
  {
    field: "whatsappUsername",
    icon: "whatsapp",
    urlBase: "https://wa.me/",
  },
  {
    field: "xUsername",
    icon: "x",
    urlBase: "https://x.com/",
  },
  {
    field: "youtubeUsername",
    icon: "youTube",
    urlBase: "https://www.youtube.com/user/",
  },
  {
    field: "twitchUsername",
    icon: "twitch",
    urlBase: "https://www.twitch.tv/",
  },
];
export const Header = () => {
  const { receiver, controller } = useRecoilValue(paymentDonateState);
  const { theme } = useTheme();
  return (
    <>
      <div className="flex items-center justify-center gap-2 w-full  ">
        <div className="w-14 h-14  border  rounded-full flex items-center justify-center p-1 ">
          <Avatar className="cursor-pointer w-full h-full  rounded-full">
            <AvatarImage src={receiver.photoURL} className="object-cover " />
            <AvatarFallback className="rounded-sm">
              <User className="w-4 h-4 text-gray-500 rounded-sm" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-center gap-2">
          <strong className="text-xl">{receiver.username}</strong>
          <BadgeCheck className="w-4 h-4" fill={"#277BB8"} color="white" />
        </div>
      </div>
      {controller.currentStep === "MESSAGE" && (
        <>
          <div className="flex items-center my-2 w-full gap-2 justify-center">
            {socialLinks.map((link) => {
              if (receiver[link.field]) {
                return (
                  <a
                    key={link.field}
                    href={`${link.urlBase}${receiver[link.field]}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500"
                  >
                    {link.icon ? (
                      <img
                        src={`https://cdn.simpleicons.org/${link.icon}`}
                        alt={`${link.field} icon`}
                        className={cn(
                          "w-5 h-5",
                          link.field === "xUsername" && theme === "dark"
                            ? "filter invert"
                            : ""
                        )}
                      />
                    ) : (
                      link.iconComponent
                    )}
                  </a>
                );
              }
            })}
          </div>
          <div className="flex flex-col items-center justify-center mt-4">
            <span className="text-lg font-semibold">Envie uma mensagem</span>
          </div>
        </>
      )}
    </>
  );
};
