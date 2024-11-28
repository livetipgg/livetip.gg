import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const UserSelect = ({
  users,
}: {
  users: Array<{ id: string; username: string; photoURL: string }>;
}) => (
  <Select>
    <SelectTrigger className="bg-card-custom">
      <span>Selecione um usuário</span>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Usuários</SelectLabel>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={user.photoURL} />
                <AvatarFallback>{user.username[0]}</AvatarFallback>
              </Avatar>
              {user.username}
            </div>
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);
