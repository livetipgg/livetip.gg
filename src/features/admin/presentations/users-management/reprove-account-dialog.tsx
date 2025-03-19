/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useAdminToggleBankAccountStatus } from "../../useCases/useAdminToggleBankAccountStatus";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { adminState } from "../../state/atoms";

export const ReproveAccountDialog = ({ user }: { user: any }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [motivo, setMotivo] = useState("");
  const { rejectBankAccount } = useAdminToggleBankAccountStatus();
  const { controller } = useRecoilValue(adminState);
  const { isLoadingToggleBankAccountStatus } = controller;
  return (
    <Dialog open={dialogOpen} onOpenChange={(isOpen) => setDialogOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button className="bg-red-400 font-bold gap-2 flex-1">
          <X className="h-5 w-5" />
          Reprovar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reprovar conta</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja reprovar a conta de {user.fullName} ?
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label>Motivo da reprovação</Label>
          <Textarea
            placeholder="Digite o motivo da reprovação"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="link" className="text-foreground">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            className="bg-red-400 font-bold gap-2"
            onClick={() => {
              console.log("user", user);
              rejectBankAccount(user.accountId, motivo);
              setDialogOpen(false);
            }}
          >
            {isLoadingToggleBankAccountStatus ? (
              "Reprovando..."
            ) : (
              <>
                <X className="h-5 w-5" />
                Reprovar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
