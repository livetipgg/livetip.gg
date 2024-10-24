import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { paymentDonateState } from "@/features/carteira/states/atoms";
import { User } from "lucide-react";
import { useRecoilValue } from "recoil";

export const Header = () => {
  const { receiver } = useRecoilValue(paymentDonateState);
  return (
    <>
      <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center absolute -top-16 shadow-md p-1">
        <Avatar className="cursor-pointer w-full h-full">
          <AvatarImage
            // src="https://musicaecinema.com/wp-content/uploads/2024/02/the-office-how-to-watch.jpg"
            className="object-cover"
          />
          <AvatarFallback>
            <User className="w-10 h-10 text-gray-500" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <strong className="text-xl">{receiver.username}</strong>
        <span className="text-lg font-semibold text-gray-400">
          Envie uma mensagem
        </span>
      </div>
    </>
  );
};
