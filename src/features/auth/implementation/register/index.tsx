import React from "react";

import logotipo_dark from "@/assets/logotipo_dark.png";
import logotipo_white from "@/assets/logotipo_white.png";

import { useTheme } from "@/components/theme-provider";
const RegisterPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden  relative">
      <img
        src={theme === "dark" ? logotipo_white : logotipo_dark}
        alt="Logotipo"
        width={140}
        className="m-5 absolute  top-0 "
      />
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px]  gap-6">
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Criar Conta
            </h1>
            <p className="text-muted-foreground text-sm">
              Preencha os campos abaixo para criar sua conta
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
