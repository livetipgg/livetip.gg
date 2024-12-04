/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "lucide-react";
import { EditUserDialog } from "./edit-user-dialog";

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
  // edit action
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      return <EditUserDialog id={row.getValue("id")} />;
    },
  },
];

//   {
//     accessorKey: "name",
//     header: "Nome",
//     cell: ({ row }) => {
//       return (
//         <div className="flex flex-col">
//           <span>{row.getValue("name")}</span>
//         </div>
//       );
//     },
//   },

//   {
//     accessorKey: "date",
//     header: "Date",
//     cell: ({ row }) => {
//       const date: string = row.getValue("date");
//       return <span>{format(date, "dd/MM/yyyy HH:mm")}</span>;
//     },
//   },
// ];

// {
//   accessorKey: "value",
//   header: "Value",
//   cell: ({ row }) => {
//     const type = row.original.type;
//     const value: number = row.getValue("value");
//     return (
//       <div>
//         {type === "income" ? (
//           <span className="text-green-500">
//             {value.toLocaleString("pt-BR", {
//               style: "currency",
//               currency: "BRL",
//             })}
//           </span>
//         ) : (
//           <span className="text-red-500">
//             -
//             {value.toLocaleString("pt-BR", {
//               style: "currency",
//               currency: "BRL",
//             })}
//           </span>
//         )}
//       </div>
//     );
//   },
// },
// {
//   accessorKey: "name",
//   header: "Nome",
//   cell: ({ row }) => {
//     return (
//       <div className="flex flex-col">
//         <span>{row.getValue("name")}</span>
//       </div>
//     );
//   },
// },

// {
//   accessorKey: "date",
//   header: "Date",
//   cell: ({ row }) => {
//     const date: string = row.getValue("date");
//     return <span>{format(date, "dd/MM/yyyy HH:mm")}</span>;
//   },
// },
