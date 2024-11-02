import { api } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Task } from "@/interface/ITask";
import { Grip, Trash2Icon, Pencil } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface EditMenuProps {
  taskId: string;
  title: string;
  projectId: number;
  setCards: Dispatch<SetStateAction<Task[]>>;
}

export const EditMenu = ({ ...props }: EditMenuProps) => {

  const deleteTaskMutation = api.kanban.deleteTask.useMutation();
  const handleDeleteTask = () => {    
    const { projectId, taskId , setCards} = props;

    setCards((pv) => pv.filter((c) => c.id !== taskId));
    toast.promise(deleteTaskMutation.mutateAsync({
      projectId : projectId,
      taskId : taskId
    }), {
      loading: "Saving changes...",
      success: () => {
        return "Changes save successfully.";
      },
      error: (error: unknown) => {
        return (error as Error).message;
      },
    });
  }

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
      <ContextMenuContent className="p-2 rounded-md shadow-md ">
        <ContextMenuItem>
          <Button className="flex items-center gap-x-3 px-4 h-6  hover:bg-transparent rounded-md cursor-pointer bg-transparent text-primary">
            <Pencil strokeWidth={1} size={16} />
            <span className="text-sm">Edit</span>
          </Button>
        </ContextMenuItem>
        <ContextMenuItem>
          <Button className="flex items-center gap-x-3 px-4 h-6  hover:bg-transparent rounded-md cursor-pointer bg-transparent text-primary"
            onClick={handleDeleteTask}
          >
            <Trash2Icon strokeWidth={1} size={16} />
            <span className="text-sm">Delete</span>
          </Button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
