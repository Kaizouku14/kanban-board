"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import CreateProject from "./_components/forms/create-form";
import KanbanBoard from "./_components/Board/kanban-board";
import { api } from "@/app/_trpc/client";

const Page = () => {
  const { data , error , isLoading }= api.kanban.projects.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if(!data) return <div>No data</div>;
 
  return (
    <div className="flex">
      <Tabs defaultValue="add" className="w-full flex flex-col gap-y-1.5">
        <TabsList className="grid grid-cols-4 grid-flow-row  items-center w-fit h-auto gap-2">
          {data.projects.length > 0 &&
            data.projects.map((value) => (
              <TabsTrigger
                key={value.id}
                value={value.id.toString()}
                className="px-12 flex items-center"
              >
                {value.projectName}
              </TabsTrigger>
            ))}

          <TabsTrigger value={"add"}>
            <Plus
              className="text-secondary bg-primary rounded-full"
              size={20}
            />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add" className="flex justify-center ">
          <CreateProject />
        </TabsContent>

        {/* Data Content */}
        {data.projects.length > 0 &&
          data.projects.map((value) => (
            <TabsContent key={value.id} value={value.id.toString()}>
              <KanbanBoard items={value.projectData} />
            </TabsContent>
          ))}
      </Tabs>
    </div>
  );
};

export default Page;
