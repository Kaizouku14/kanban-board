"use client"

import { useState } from "react"
import Profile from "./profile"
import { ModeToggle } from "../ThemeProvider/mode-toggle";

const Header = () => {
   const [isAuthorize , setIsAuthorize] = useState(false);

  return (
    <div className="h-24 flex items-center justify-between">
        <h1 className="text-xl font-bold">Kanban board</h1>

        {isAuthorize ? (
          <Profile/>
        ) : (
          <ModeToggle/>
        )}
    </div>
  )
}

export default Header