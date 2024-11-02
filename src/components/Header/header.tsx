"use client"

import Profile from "./profile"
import { ModeToggle } from "../ThemeProvider/mode-toggle";

interface HeaderProps {
  isAuthorize?: boolean;
}

const Header = ({ isAuthorize }: HeaderProps) => { 

  return (
    <div className="h-24 flex items-center justify-between">
      <h1 className="text-xl font-bold">Kanban board</h1>
      {isAuthorize ? <Profile /> : <ModeToggle />} 
    </div>
  );
};

export default Header


