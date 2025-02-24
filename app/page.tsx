import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  return (
    <div className="bg-dark h-screen p-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
    
          <AvatarFallback>
            CN
          </AvatarFallback>
      </Avatar>
     
    </div>
  );
}

