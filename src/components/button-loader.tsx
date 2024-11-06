import React from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonLoadingProps {
  message?: string;
  className?: string;
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
  className,
  variant = "default",
}) => {
  return (
    <Button disabled className={cn(className, "w-full")} variant={variant}>
      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      {message}
    </Button>
  );
};

export default ButtonLoading;
