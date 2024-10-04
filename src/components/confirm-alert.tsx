import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import { Button } from "./ui/button";

interface ConfirmAlertProps {
  children: React.ReactNode;
  disabled?: boolean;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
}

export const ConfirmAlert = ({
  children,
  title,
  description,
  onConfirm,
  cancelText = "Cancelar",
  confirmText = "Continuar",
  disabled = false,
}: ConfirmAlertProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (disabled) return;
        console.log("open", open);
        console.log("disabled", disabled);
        setOpen(open);
      }}
    >
      <AlertDialogTrigger className="p-0 m-0 ">{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="link"
            onClick={() => {
              setOpen(false);
            }}
          >
            {cancelText}
          </Button>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
