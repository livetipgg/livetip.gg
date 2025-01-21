import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authState } from "@/features/auth/states/atoms";
import { useRecoilValue } from "recoil";

export const VerifyEmailDialog = () => {
  const { user } = useRecoilValue(authState);
  console.log(user);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Verificar Email</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
