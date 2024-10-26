import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { paymentDonateState } from "@/features/carteira/states/atoms";
import { BadgeCheck, User } from "lucide-react";
import { useRecoilValue } from "recoil";

export const Header = () => {
  const { receiver, controller } = useRecoilValue(paymentDonateState);
  return (
    <>
      <div className="flex items-center gap-2 w-full bg-muted/40 ">
        <div className="w-16 h-16 bg-white rounded-sm flex items-center justify-center  ">
          <Avatar className="cursor-pointer w-full h-full rounded-sm">
            <AvatarImage
              // src="https://musicaecinema.com/wp-content/uploads/2024/02/the-office-how-to-watch.jpg"
              className="object-cover "
            />
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
        <div className="flex flex-col items-center justify-center mt-4">
          <span className="text-lg font-semibold">Envie uma mensagem</span>
        </div>
      )}
    </>
  );
};
