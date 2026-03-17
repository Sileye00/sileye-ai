import { Avatar, AvatarImage } from "@/components/ui/avatar"

export const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8 bg-violet-600 p-1">
      <AvatarImage className="object-contain" src="/logo.png" />
    </Avatar>
  );
};