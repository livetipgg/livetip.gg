/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Check, ChevronsUpDown, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { useAdminGetAllUsersUseCase } from "@/features/admin/useCases/useAdminGetAllUsersUseCase";
import { useRecoilValue } from "recoil";
import { adminState } from "@/features/admin/state/atoms";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserFilterProps {
  userSelected: any;
  onUserSelect: (value: any) => void;
  onClear?: () => void;
}
export function SelectUserCombobox({
  onUserSelect,
  userSelected,
}: UserFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(userSelected);

  const { getAllUsers } = useAdminGetAllUsersUseCase();
  const { controller } = useRecoilValue(adminState);
  const { getAllUsersParams } = controller;
  const { page } = getAllUsersParams;

  const { isPending, data } = useQuery({
    queryKey: ["admin_users", page],
    queryFn: () =>
      getAllUsers({
        limit: 100,
        page: 1,
      }),
  });

  if (isPending) {
    return null;
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="max-w-[300px] w-full justify-between"
          >
            <div className="flex items-center gap-2">
              {value && (
                <Avatar className="h-4 w-4 rounded-full">
                  <AvatarImage
                    src={
                      data.results.find((a) => a.id === value)
                        ?.photoURL as string
                    }
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-full">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              {value
                ? data.results.find((data) => data.id === value)?.username
                : "Selecionar usuário..."}
            </div>

            <ChevronsUpDown className="opacity-50" size={14} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <Command>
            <CommandInput placeholder="Pesquisar usuário..." />
            <CommandList>
              <CommandEmpty>Nenhum usuário encontrado</CommandEmpty>
              <CommandGroup>
                {data.results.map((user, idx) => {
                  return (
                    <CommandItem
                      key={idx}
                      value={user.username}
                      onSelect={(currentValue) => {
                        setValue(
                          currentValue === value
                            ? ""
                            : data.results.find(
                                (data) => data.username === currentValue
                              )?.id
                        );

                        onUserSelect(
                          data.results.find(
                            (data) => data.username === currentValue
                          )?.id
                        );
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 rounded-full">
                          <AvatarImage
                            src={user.photoURL as string}
                            className="object-cover"
                          />
                          <AvatarFallback className="rounded-full">
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        {user.username}
                      </div>
                      <Check
                        className={cn(
                          "ml-auto",
                          value === user.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {value && (
        <Button
          variant="link"
          className="w-full lg:w-auto mt-4 lg:mt-0"
          onClick={() => {
            setValue(null);
            onUserSelect(null);
          }}
        >
          Limpar Usuario
        </Button>
      )}
    </>
  );
}
