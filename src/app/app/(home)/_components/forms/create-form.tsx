"use client";

import { createFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { X } from "lucide-react";
import { 
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const CreateProject = () => {
  const [tasks, setTasks] = React.useState<string[]>([]);
  const [taskInput, setTaskInput] = React.useState("");

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      projectName: "",
    },
  });

  function onSubmit(values: z.infer<typeof createFormSchema>) {
    console.log(values);
    console.log(tasks)
  }

  function addTask(task: string) {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTaskInput("");
    }
  }

  function removeTask(index: number) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-x-12 items-center h-96"
      >
        <div className="w-96 space-y-8">
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Project name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-x-4">
            <Input
              placeholder="Task to-do..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <Button type="button" onClick={() => addTask(taskInput)}>
              Add
            </Button>
          </div>

          <Button className="w-full" type="submit">
            Create
          </Button>
        </div>

        <ScrollArea className="size-80">
          <div className="flex flex-col rounded-lg border border-gray-300 p-4 gap-2">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-x-2 border border-gray-200 rounded-lg p-2 w-full h-10 "
                >
                  <span className="truncate">{task}</span>
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => removeTask(index)}
                  >
                    <X size={18} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tasks added yet.</p>
            )}
          </div>
        </ScrollArea>
      </form>
    </Form>
  );
};

export default CreateProject;
