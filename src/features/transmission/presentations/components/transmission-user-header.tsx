import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, User } from "lucide-react";
import { CreatorMessageLink } from "./creator-message-link";
import { ModeToggle } from "@/components/mode-toggle";

export const TransmissionUserHeader = ({ user }) => {
  const url = import.meta.env.PROD
    ? import.meta.env.VITE_PRODUCTION_URL
    : import.meta.env.VITE_DEVELOPMENT_URL;

  return (
    <div className=" flex items-center mb-5 justify-center md:justify-between  flex-wrap">
      <div className="flex items-center justify-center flex-wrap  gap-4">
        <div className="w-28 h-28 bg-background rounded-full flex items-center justify-center  shadow-md p-1">
          <Avatar className="cursor-pointer w-full h-full">
            <AvatarImage src={user.photoUrl} className="object-cover" />
            <AvatarFallback>
              <User className="w-10 h-10 text-gray-500" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex  w-full md:w-fit text-center">
          <strong className="text-xl bg-background flex items-center px-4 py-2 rounded-md shadow-sm">
            {user.username}
            <BadgeCheck
              className="w-4 h-4 ml-2"
              fill={"#277BB8"}
              color="white"
            />
          </strong>
        </div>
      </div>
      <div className="md:flex items-center flex flex-wrap justify-center md:justify-normal  gap-2 ">
        <CreatorMessageLink url={url} user={user} />

        <div className="bg-background hidden md:flex shadow-sm  w-fit border">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
