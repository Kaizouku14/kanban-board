import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Grip, Trash2Icon, Pencil } from "lucide-react";

import React from "react";

interface EditMenuProps {
  title: string;
  projectId : number;
}

export const EditMenu = ({ ...props }: EditMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className="cursor-grab rounded border dark:border-neutral-700 dark:bg-neutral-800 p-3 active:cursor-grabbing
         border-gray-100 shadow flex items-center justify-between
        "
        >
          <div className="w-52 truncate">
            <p className="text-sm dark:text-neutral-100 text-neutral-950">
              {props.title}
            </p>
          </div>
          <Grip strokeWidth={1} size={16} />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="p-2 rounded-md shadow-md">
        <ContextMenuItem className="flex items-center gap-x-3 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
          <Pencil strokeWidth={1} size={16} />
          <span className="text-sm">Edit</span>
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-x-3 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
          <Trash2Icon strokeWidth={1} size={16} />
          <span className="text-sm">Delete</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
