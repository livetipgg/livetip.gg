/* eslint-disable @typescript-eslint/no-explicit-any */
import { QRCodeSVG } from "qrcode.react";
import iconLogo from "@/assets/icon.png";
import { cn } from "@/lib/utils";

type UserQrCodeProps = {
  className?: string;
  user: any;
};

export const UserQrCode = ({ user, className }: UserQrCodeProps) => {
  const url = import.meta.env.PROD
    ? import.meta.env.VITE_PRODUCTION_URL
    : import.meta.env.VITE_DEVELOPMENT_URL;

  return (
    <div
      className={cn(
        "bg-primary shadow-lg mb-10 p-1 xl:p-4 rounded-xl h-fit xl:h-[260px] w-fit xl:w-[200px] flex flex-col items-center justify-center",
        className
      )}
    >
      <span className="text-white font-bold hidden xl:flex">
        livetip.gg/{user.username}
      </span>
      <QRCodeSVG
        className="bg-white p-1 w-fit h-32 xl:h-[180px] rounded-lg"
        value={`${url}${user.username}`}
        size={180}
        imageSettings={{
          src: iconLogo,
          x: undefined,
          y: undefined,
          height: 30,
          width: 44,
          excavate: true,
        }}
      />
      <span className="text-white font-bold text-center text-sm mt-2  hidden xl:flex">
        leia o código com a câmera do celular.
      </span>
    </div>
  );
};
