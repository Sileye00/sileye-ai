import { Avatar, AvatarImage } from "@/components/ui/avatar"

export const BotAvatar = () => {
  return (
    <Avatar className="h-10 w-20">
      <AvatarImage className="p-1" src="/logo.png" />
    </Avatar>
  );
};