"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X } from "lucide-react";
import CreateProject from "./_components/forms/create-form";
import KanbanBoard from "./_components/Board/kanban-board";
import { api } from "@/app/_trpc/client";
import { Task } from "@/interface/ITask";
import { toast } from "sonner";
import TabsSkeleton from "./_components/skeleton/tabs-skeleton";

const Page = () => {
  const { data, isLoading } = api.kanban.projects.useQuery(undefined, {
    refetchInterval: 1000,
  });
  const deleteProjetMutation = api.kanban.deleteProject.useMutation();

  if (isLoading) return <TabsSkeleton />;

  const handleDeleteProject = (id: number) => {
    toast.promise(
      deleteProjetMutation.mutateAsync({
        projectId: id,
      }),
      {
        loading: "Deleting project...",
        success: () => {
          return "Project deleted successfully.";
        },
        error: (error: unknown) => {
          return (error as Error).message;
        },
      }
    );
  };

  return (
    <div className="flex">
      <Tabs defaultValue="add" className="w-full flex flex-col gap-y-1.5">
        {data && (
          <TabsList
            className={`grid grid-cols-2 md:grid-cols-4 gap-2 items-center w-full h-auto`}
          >
            {data.map((value) => (
              <TabsTrigger
                key={value.id}
                value={value.id.toString()}
                className="px-4 md:px-12 flex items-center relative"
              >
               
                <span className="w-44 truncate max-md:text-xs"> {value.title}</span>
                <X
                  className="cursor-pointer text-gray-400 absolute right-1.5 bg-transparent hover:bg-transparent"
                  size={16}
                  onClick={() => handleDeleteProject(value.id)}
                />
              </TabsTrigger>
            ))}
            <TabsTrigger value="add" className="px-4 md:px-12">
              <Plus
                className="text-secondary bg-primary rounded-full"
                size={20}
              />
            </TabsTrigger>
          </TabsList>
        )}

        <TabsContent value="add" className="flex justify-center ">
          <CreateProject />
        </TabsContent>

        {data &&
          data.map((value) => (
            <TabsContent key={value.id} value={value.id.toString()}>
              <KanbanBoard projectId={value.id} items={value.data as Task[]} />
            </TabsContent>
          ))}
      </Tabs>
    </div>
  );
};

export default Page;
