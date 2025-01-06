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
import { useRecoilState, useRecoilValue } from "recoil";
import { profileState } from "@/features/profile/states/atoms";
import { Button } from "@/components/ui/button";
import { useAdminToggleUserIsVerified } from "../../useCases/useAdminToggleUserIsVerified";
import { adminState } from "../../state/atoms";

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
    accessorKey: "tax_value",
    header: "Taxa",
    cell: ({ row }) => {
      const tax_value = row.original.tax_value;
      return (
        <div>
          <span className="font-semibold text-md">
            {tax_value ? (
              <Badge className="bg-blue-500/20 text-blue-500 border-blue-500 rounded-xl">
                {tax_value}%
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
    accessorKey: "created_by",
    header: "Origem",
    cell: ({ row }) => {
      const badgeConfig = {
        admin: {
          bgColor: "bg-red-500/20",
          textColor: "text-red-500",
          borderColor: "border-red-500",
          text: "Admin",
        },
        livetip: {
          bgColor: "bg-orange-500/20",
          textColor: "text-orange-500",
          borderColor: "border-orange-500",
          text: "LiveTip",
        },
      };

      const createdBy = row.getValue("created_by") as keyof typeof badgeConfig;
      return (
        <div>
          <span className="font-semibold text-md">
            {createdBy ? (
              <Badge
                className={cn(
                  badgeConfig[createdBy]?.bgColor,
                  badgeConfig[createdBy]?.textColor,
                  badgeConfig[createdBy]?.borderColor,
                  "rounded-xl"
                )}
              >
                {badgeConfig[createdBy]?.text}
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
    cell: ({ row }) => {
      const { toggleUserIsVerified } = useAdminToggleUserIsVerified();
      const isVerified = row.original.is_verified;
      const userId = row.original.id;
      const [, setGetAllUsersState] = useRecoilState(adminState);

      return (
        <div>
          <Switch
            onCheckedChange={() => {
              setGetAllUsersState((prev) => ({
                ...prev,
                users: {
                  ...prev.users,
                  results: prev.users.results.map((user) => {
                    if (user.id === userId) {
                      return {
                        ...user,
                        is_verified: !user.is_verified,
                      };
                    }
                    return user;
                  }),
                },
              }));

              toggleUserIsVerified(userId, isVerified);
            }}
            id="verified"
            checked={isVerified}
          />
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
