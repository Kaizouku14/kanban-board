"use client"

import Profile from "./profile"

const Header = () => {

  return (
    <div className="h-24 flex items-center justify-between">
        <h1 className="text-xl font-medium">Kanban board</h1>
        <Profile/>
    </div>
  )
}

export default Header