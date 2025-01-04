/* eslint-disable @typescript-eslint/no-explicit-any */
import iconLogo from "@/assets/icon.png";
import { cn } from "@/lib/utils";
import { QRCode } from "react-qrcode-logo";

type UserQrCodeProps = {
  className?: string;
  user: any;
};

export const UserQrCode = ({ user, className }: UserQrCodeProps) => {
  return (
    <div
      className={cn(
        "bg-primary shadow-lg mb-10 p-1 xl:p-4 rounded-xl h-fit xl:h-[260px] w-fit xl:w-[200px] flex flex-col items-center justify-center",
        className
      )}
    >
      <span className="text-white font-bold hidden xl:flex">
        app.livetip.gg/{user.username}
      </span>
      <QRCode
        value={`https://app.livetip.gg/${user.username}`}
        size={160}
        logoImage={iconLogo}
        logoHeight={20}
        removeQrCodeBehindLogo
        bgColor="#ffffff"
        style={{
          borderRadius: "10px",
        }}
      />
      <span className="text-white font-bold text-center text-sm mt-2  hidden xl:flex">
        leia o código com a câmera do celular.
      </span>
    </div>
  );
};
