import notFoundGif from "@/assets/404.gif";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export const NotFoundPage = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, []);

  return (
    <div className="bg-background w-screen h-screen flex items-center justify-center flex-col gap-2">
      <img src={notFoundGif} alt="Not Found" />
      <div className="flex my-4 flex-col items-center">
        <h1 className="font-semibold text-4xl">Página não encontrada</h1>
        <p className="text-gray-500 text-center mt-2">
          A página que você está procurando não existe.
        </p>
      </div>
      <Button
        variant="secondary"
        onClick={() => {
          window.location.href = "/inicio";
        }}
      >
        Voltar para a página inicial{" "}
      </Button>
    </div>
  );
};
