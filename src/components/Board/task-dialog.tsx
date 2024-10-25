import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

const AddTask = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute right-0 top-0 cursor-pointer rounded-full bg-primary text-secondary size-6">
          <Plus size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Task to-do</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <Input id="task" placeholder="task..." />
          <Button type="submit">Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
