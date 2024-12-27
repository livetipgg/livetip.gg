/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "lucide-react";
import { EditUserDialog } from "./edit-user-dialog";
import moment from "moment";

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
      return (
        <div>
          <span className="font-semibold text-md">
            {row.getValue("created_at") || "-"}
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
            {updatedAt ? moment(updatedAt).format("DD/MM/YYYY") : "-"}
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
