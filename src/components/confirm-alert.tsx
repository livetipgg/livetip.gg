import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmAlertProps {
  children: React.ReactNode;
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
}: ConfirmAlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="p-0 m-0 ">{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
            }}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
