import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ProfileUsernameUploader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <AlertDialogTrigger className="p-0 m-0" asChild>
        <Button variant="link">Editar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Alterar nome de usuário</AlertDialogTitle>
          <AlertDialogDescription>
            Altere o nome de usuário para algo que você goste.
          </AlertDialogDescription>
          <div className="flex flex-col space-y-2 pt-5">
            <Label htmlFor="">Novo Nome de usuário</Label>
            <Input
              value={newUsername}
              className="p-5"
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="link"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancelar
          </Button>
          <AlertDialogAction
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Salvar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProfileUsernameUploader;
