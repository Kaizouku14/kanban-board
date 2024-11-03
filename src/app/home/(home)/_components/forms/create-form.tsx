"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { X } from "lucide-react";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createFormSchema } from "../schema";
import { api } from "@/app/_trpc/client";
import { toast } from "sonner";
import { Task } from "@/interface/ITask";

const CreateProject = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      projectName: "",
    },
  });

  const createMutation = api.kanban.createProject.useMutation();
  function onSubmit(values: z.infer<typeof createFormSchema>) {
    toast.promise(
      createMutation.mutateAsync({
        title: values.projectName,
        tasks: tasks,
      }),
      {
        loading: "Creating project...",
        success: () => {
          setTasks([]);
          return "Project created successfully.";
        },
        error: (error: unknown) => {
          return (error as Error).message;
        },
      }
    );
  }

  function addTask(task: string) {
    if (task.trim()) {
      const randomId = Math.floor(Math.random() * 10000);
      const newTask: Task = {
        id: randomId.toString(),
        title: task,
        column: "todo",
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
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
        className="flex flex-col max-md:w-full md:flex-row gap-y-8 md:gap-x-12 items-center h-auto md:h-96"
      >
        <div className="w-full md:w-96 space-y-8">
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

          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Task to-do..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="flex-grow"
            />
            <Button
              type="button"
              onClick={() => addTask(taskInput)}
              className="w-full md:w-auto"
            >
              Add
            </Button>
          </div>

          <Button className="w-full" type="submit">
            Create
          </Button>
        </div>

        <ScrollArea className="w-full md:w-80 h-80">
          <div className="flex flex-col rounded-lg border border-gray-300 p-4 gap-2">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-x-2 border border-gray-200 rounded-lg p-2 w-full h-10 "
                >
                  <span className="truncate">{task.title}</span>
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
