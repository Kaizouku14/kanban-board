"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import CreateProject from "./_components/forms/create-form";
import KanbanBoard from "./_components/Board/kanban-board";
import { api } from "@/app/_trpc/client";
import { Task } from "@/interface/ITask";

const Page = () => {
  const { data, error, isLoading } = api.kanban.projects.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex">
      <Tabs defaultValue="add" className="w-full flex flex-col gap-y-1.5">
        {data && (
          <TabsList
            className={`grid ${
              data.length > 0 ? "grid-cols-4" : "flex justify-center"
            } grid-flow-row items-center w-fit h-auto gap-2`}
          >
            {data?.map((value) => (
              <TabsTrigger
                key={value.id}
                value={value.id.toString()}
                className="px-12 flex items-center"
              >
                {value.title}
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
