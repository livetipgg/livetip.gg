/* eslint-disable @typescript-eslint/no-explicit-any */
import iconLogo from "@/assets/icon.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toPng } from "html-to-image";
import { useRef } from "react";
import { QRCode } from "react-qrcode-logo";

type UserQrCodeProps = {
  className?: string;
  user: any;
  config?: any;
};

export const UserDynamicQrcode = ({
  user,
  className,
  config,
}: UserQrCodeProps) => {
  const { showLink, showMessage } = config;
  const qrRef = useRef<HTMLDivElement>(null);
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
    <div className="flex flex-col gap-4 items-center">
      <div
        ref={qrRef}
        className={cn(
          "bg-primary shadow-lg  p-1 xl:p-1 rounded-xl h-fit xl:max-h-[260px] w-fit xl:max-w-[200px] flex flex-col items-center justify-center",
          className
        )}
      >
        {showLink && (
          <span className="text-white font-bold hidden xl:flex">
            livetip.gg/{user.username}
          </span>
        )}

        <QRCode
          value={`https://livetip.gg/${user.username}`}
          size={160}
          logoImage={iconLogo}
          logoHeight={20}
          removeQrCodeBehindLogo
          bgColor="#ffffff"
          style={{
            borderRadius: "10px",
          }}
        />
        {showMessage && (
          <span className="text-white font-bold text-center text-sm mt-2  hidden xl:flex">
            leia o código com a câmera do celular.
          </span>
        )}
      </div>
      <Button onClick={downloadQRCode} className="w-full" variant="link">
        Baixar QRCode
      </Button>
    </div>
  );
};
