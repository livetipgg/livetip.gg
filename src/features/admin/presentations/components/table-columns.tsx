/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "lucide-react";
import { EditUserDialog } from "./edit-user-dialog";
import moment from "moment";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
          <span className=" text-md">{row.getValue("username")}</span>
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
          color: "bg-green-500",
          text: "LiveTip",
        },
      };

      const createdBy = row.getValue("created_by") as keyof typeof badgeConfig;
      return (
        <div>
          <span className="font-semibold text-md">
            {createdBy ? (
              <Badge className={cn(badgeConfig[createdBy].color, "text-white")}>
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
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const userId = row.original.id; // Acesse diretamente o ID

      return <EditUserDialog id={userId} key={`edit-user-${userId}`} />;
    },
  },
];
