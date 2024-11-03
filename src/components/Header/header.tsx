"use client";

import Profile from "@/app/(profile)/_components/profile";
import { ModeToggle } from "../ThemeProvider/mode-toggle";
import Link from "next/link";

type User = {
  id: string;
  username: string;
  email: string;
};

interface HeaderProps {
  isAuthorize?: User;
}

const Header = ({ isAuthorize }: HeaderProps) => {
  return (
    <div className="h-24 flex items-center justify-between ">
      <Link href={"/home"} className="text-xl font-bold cursor-pointer">
        Kanban board
      </Link>
      {isAuthorize ? (
        <div className="flex gap-x-3 items-center">
          <Profile />
          <span className="font-medium">{isAuthorize.username}</span>
        </div>
      ) : (
        <ModeToggle />
      )}
    </div>
  );
};

export default Header;
