import React from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

interface ButtonLoadingProps {
  message?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const ButtonLoading: React.FC<ButtonLoadingProps> = ({
  message,
  variant = "default",
}) => {
  return (
    <Button disabled className={`w-full `} variant={variant}>
      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      {message}
    </Button>
  );
};

export default ButtonLoading;
