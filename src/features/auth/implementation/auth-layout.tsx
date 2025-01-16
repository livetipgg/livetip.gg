// src/layouts/AuthLayout.tsx

import React from "react";
import logotipo from "@/assets/logotipoOrange.svg";
import logotipoWhite from "@/assets/logowhite.svg";
import icon from "@/assets/icon.svg";
import { useIsMobile } from "@/hooks/use-mobile";
import { ModeToggle } from "@/components/mode-toggle";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  return (
    <div className="container relative  h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full  flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className={`absolute inset-0 bg-primary  `} />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img
            src={isMobile ? icon : logotipoWhite}
            alt="Logotipo"
            className="w-40"
          />
        </div>
        <div className="relative  mt-auto  z-20 flex  justify-end h-full flex-col ">
          <h1 className="text-6xl font-bold">
            Receba doações instantâneas via PIX e Bitcoin.
          </h1>
        </div>
      </div>
      <div className="mx-auto flex w-screen flex-col justify-center space-y-6 bg-[#f5f5f5] dark:bg-background">
        <div className="w-full h-screen flex items-center justify-center overflow-hidden relative">
          <ModeToggle className="absolute top-4 right-4" />
          <div className="flex items-center justify-center py-12  ">
            {isMobile && (
              <img
                src={logotipo}
                alt="Logotipo"
                className="absolute top-10 z-20 w-20"
              />
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
