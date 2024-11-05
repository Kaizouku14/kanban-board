"use client";

import { api } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { Task } from "@/interface/ITask";
import { Grip, Trash2Icon, Pencil, CircleCheck, X } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface EditMenuProps {
  taskId: string;
  title: string;
  projectId: number;
  setCards: Dispatch<SetStateAction<Task[]>>;
}

export const EditMenu = ({ ...props }: EditMenuProps) => {
  const [isActive, setIsActive] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);
  const updateTaskMutation = api.kanban.updateTask.useMutation();
  const deleteTaskMutation = api.kanban.deleteTask.useMutation();

  const handleEditTask = () => {
    const { projectId, taskId, setCards } = props;

    toast.promise(
      updateTaskMutation.mutateAsync({
        projectId: projectId,
        taskId: taskId,
        newTitle: newTitle,
      }),
      {
        loading: "Saving changes...",
        success: () => {
          setIsActive(false);
          setCards((pv) =>
            pv.filter((c) => {
              if (c.id === taskId) {
                c.title = newTitle;
              }
              return c;
            })
          );
          return "Changes saved successfully.";
        },
        error: (error: unknown) => {
          return (error as Error).message;
        },
      }
    );
  };

  const handleDeleteTask = () => {
    const { projectId, taskId, setCards } = props;

    setCards((pv) => pv.filter((c) => c.id !== taskId));
    toast.promise(
      deleteTaskMutation.mutateAsync({
        projectId: projectId,
        taskId: taskId,
      }),
      {
        error: (error: unknown) => {
          return (error as Error).message;
        },
      }
    );
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={`cursor-grab flex items-center  justify-between rounded border dark:border-neutral-700 dark:bg-neutral-800 ${
            isActive ? "p-1" : "p-3"
          } active:cursor-grabbing
          border-gray-100 shadow `}
        >
          {isActive ? (
            <>
              <Input
                className="md:w-56 w-28 border shadow-white"
                placeholder="Enter new task"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <CircleCheck
                className="max-md:h-4 cursor-pointer text-gray-500 transition-all duration-200 ease-in-out transform hover:text-white hover:fill-green-400 "
                size={22}
                onClick={handleEditTask}
              />
            </>
          ) : (
            <>
              <div className="md:w-56 w-44 text-wrap">
                <p className="text-sm dark:text-neutral-100 text-neutral-950">
                  {props.title}
                </p>
              </div>
              <Grip className="hidden md:block" strokeWidth={1} size={16} />
            </>
          )}
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="p-2 rounded-md shadow-md ">
        <ContextMenuItem>
          {isActive ? (
            <Button
              className="flex items-center gap-x-3 px-4 h-6 shadow-none hover:bg-transparent rounded-md cursor-pointer bg-transparent text-primary"
              onClick={() => setIsActive(false)}
            >
              <X strokeWidth={1} size={16} />
              <span className="text-sm">Cancel</span>
            </Button>
          ) : (
            <Button
              className="flex items-center gap-x-3 px-4 h-6 shadow-none hover:bg-transparent rounded-md cursor-pointer bg-transparent text-primary"
              onClick={() => setIsActive(true)}
            >
              <Pencil strokeWidth={1} size={16} />
              <span className="text-sm">Edit</span>
            </Button>
          )}
        </ContextMenuItem>
        <ContextMenuItem>
          <Button
            className="flex items-center gap-x-3 px-4 h-6 shadow-none hover:bg-transparent rounded-md cursor-pointer bg-transparent text-primary"
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
