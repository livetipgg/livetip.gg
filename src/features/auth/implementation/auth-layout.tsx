// src/layouts/AuthLayout.tsx

import React from "react";
import logotipoWhite from "@/assets/logotipo_white.png";
import background from "@/assets/background.png";
import icon from "@/assets/icon.png";
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
        <div className={`absolute inset-0 bg-secondary  `} />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img
            src={isMobile ? icon : logotipoWhite}
            alt="Logotipo"
            className="w-32"
          />
        </div>
        <div className="relative  mt-auto  z-20 flex items-center justify-center h-full flex-col ">
          <img src={background} alt="Logotipo" className=" w-3/4 " />
        </div>
      </div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 ">
        <div className="w-full h-screen flex items-center justify-center overflow-hidden relative">
          <ModeToggle className="absolute top-4 right-4" />
          <div className="flex items-center justify-center py-12  ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
