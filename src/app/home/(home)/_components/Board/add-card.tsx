"use client";

import { FC, FormEvent, useState } from "react";
import { motion } from "framer-motion"
import { Plus } from "lucide-react";
import { Task } from "@/interface/ITask";
import { api } from "@/app/_trpc/client";
import { toast } from "sonner";

interface AddCardProps {
  projectId : number;
  column: string;
  setCards: React.Dispatch<React.SetStateAction<Task[]>>;
}

const AddCard:FC<AddCardProps> = ({ projectId, column, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const addTaskMutation = api.kanban.addTask.useMutation();
  const handleSubmit = (e : FormEvent<HTMLFormElement>) => { 
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.floor(Math.random() * 10000).toString(),
    };

    setCards((prev) => [...prev, newCard]);

    toast.promise(addTaskMutation.mutateAsync({
      projectId : projectId,
      task : newCard
    }), {
      error: (error: unknown) => {
        return (error as Error).message;
      },
    });
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-primary placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <Plus/>
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-foreground transition-colors hover:text-gray-500"
        >
          <span>Add card</span>
          <Plus/>
        </motion.button>
      )}
    </>
  );
};


export default AddCard;