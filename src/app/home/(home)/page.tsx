"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X } from "lucide-react";
import CreateProject from "./_components/forms/create-form";
import KanbanBoard from "./_components/Board/kanban-board";
import { api } from "@/app/_trpc/client";
import { Task } from "@/interface/ITask";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Page = () => {
  const { data, error, isLoading } = api.kanban.projects.useQuery(undefined, {
    refetchInterval: 1000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const deleteProjetMutation = api.kanban.deleteProject.useMutation();
  const handleDeleteProject = (id : number) => {
    toast.promise(deleteProjetMutation.mutateAsync({
      projectId : id,
    }), {
      loading: "Deleting project...",
      success: () => {
        return "Project deleted successfully.";
      },
      error: (error: unknown) => {
        return (error as Error).message;
      },
    });
  };

  return (
    <div className="flex">
      <Tabs defaultValue="add" className="w-full flex flex-col gap-y-1.5">
        {data && (
          <TabsList
            className={`grid ${
              data.length > 0 ? "grid-cols-4" : "flex justify-center"
            } grid-flow-row items-center w-full h-auto gap-2`}
          >
            {data?.map((value) => (
              <TabsTrigger
                key={value.id}
                value={value.id.toString()}
                className="px-12 flex items-center relative"
              >
                {value.title}
                <Button className="text-xs text-gray-400 absolute right-1.5 size-2 bg-transparent hover:bg-transparent"
                  onClick={() => handleDeleteProject(value.id)}
                >
                  <X className="cursor-pointer" 
                     size={17} 
                  />
                </Button>
              </TabsTrigger>
            ))}
            <TabsTrigger value="add">
              <Plus
                className="text-secondary bg-primary rounded-full "
                size={20}
              />
            </TabsTrigger>
          </TabsList>
        )}

        <TabsContent value="add" className="flex justify-center ">
          <CreateProject />
        </TabsContent>

        {/* Data Content */}
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
