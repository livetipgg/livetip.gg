/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { Ban, LoaderCircle, User } from "lucide-react";
import { EditUserDialog } from "./edit-user-dialog";
import moment from "moment";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { VirtualWithdrawDialog } from "./saque-virtual-dialog";
import { ConfirmAlert } from "@/components/confirm-alert";
import { useProfileCancelAccount } from "@/features/profile/useCases/useProfileCancelAccount";
import { useRecoilValue } from "recoil";
import { profileState } from "@/features/profile/states/atoms";
import { Button } from "@/components/ui/button";

export const usersColumn: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return (
        <div>
          <span className="font-semibold text-md">{row.getValue("id")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      const photoURL = row.original.photoURL;
      const firstName = row.original.first_name;
      const lastName = row.original.last_name;

      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage
              src={photoURL as string}
              alt={row.getValue("username")}
              className="object-cover"
            />
            <AvatarFallback className="rounded-full">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-md ">
              {row.getValue("username")}
            </span>
            <span className="font-medium text-sm text-gray-500">
              {firstName} {lastName}
            </span>
          </div>
        </div>
      );
    },
  },
  // created_at
  {
    accessorKey: "created_at",
    header: "Data de Criação",
    cell: ({ row }) => {
      const createdAt = row.getValue("created_at");
      return (
        <div>
          <span className="font-semibold text-md">
            {createdAt ? moment(createdAt).format("DD/MM/YYYY HH:MM") : "-"}
          </span>
        </div>
      );
    },
  },
  // updated_at
  {
    accessorKey: "updated_at",
    header: "Data de atualização",
    cell: ({ row }) => {
      const updatedAt = row.getValue("updated_at");
      return (
        <div>
          <span className="font-semibold text-md">
            {updatedAt ? moment(updatedAt).format("DD/MM/YYYY HH:MM") : "-"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_by",
    header: "Origem",
    cell: ({ row }) => {
      const badgeConfig = {
        admin: {
          color: "bg-red-500",
          text: "Admin",
        },
        livetip: {
          color: "bg-orange-500",
          text: "LiveTip",
        },
      };

      const createdBy =
        (row.getValue("created_by") as keyof typeof badgeConfig) || "livetip";
      return (
        <div>
          <span className="font-semibold text-md">
            {createdBy ? (
              <Badge
                className={cn(badgeConfig[createdBy]?.color, "text-white")}
              >
                {createdBy}
              </Badge>
            ) : (
              "-"
            )}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "isVerified",
    header: "Verificado",
    cell: () => {
      return (
        <div>
          <Switch id="verified" disabled />
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const userId = row.original.id; // Acesse diretamente o ID
      const { handleCancelAccount } = useProfileCancelAccount();
      const { controller } = useRecoilValue(profileState);
      const { isLoadingCancelAccount } = controller;

      return (
        <div className="flex items-center gap-2">
          <EditUserDialog id={userId} key={`edit-user-${userId}`} />
          <VirtualWithdrawDialog
            id={userId}
            key={`virtual-withdraw-user-${userId}`}
          />
          <ConfirmAlert
            title="Encerrar conta"
            description="Tem certeza que deseja encerrar essa conta? Essa ação não poderá ser desfeita."
            confirmText="Encerrar conta"
            cancelText="Voltar"
            disabled={isLoadingCancelAccount}
            onConfirm={() => handleCancelAccount(userId)}
          >
            <Button
              title="Encerrar conta"
              size="icon"
              variant="link"
              disabled={isLoadingCancelAccount}
            >
              {isLoadingCancelAccount ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                <Ban size={16} />
              )}
            </Button>
          </ConfirmAlert>
        </div>
      );
    },
  },
];
