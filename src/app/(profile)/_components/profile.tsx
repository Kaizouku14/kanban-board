"use client";

import { User, LogOut, SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  const logoutMutation = api.auth.logout.useMutation();

  const handleLogout = async () => {
    toast.promise(logoutMutation.mutateAsync(), {
      loading: "logging out...",
      success: () => {
        router.push("/login");
        return "logged out successfully.";
      },
      error: (error: unknown) => {
        return (error as Error).message;
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full size-8">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/account" className="flex items-center gap-1">
              <User size={17} />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/appearance" className="flex items-center gap-1">
              <SunMoon size={17} />
              <span>Theme</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
