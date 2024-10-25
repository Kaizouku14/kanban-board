import KanbanBoard from "@/components/Board/kanban-board";
import CreateProject from "@/components/Forms/create-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

const DashBoard = () => {
  const data = [
    {
      id: 1,
      projectName: "Hotel management system",
      projectData: [
        {
          todoList: [],
          inProgressList: [],
          validateList: [],
          completeList: [],
        },
      ],
    },
    {
      id: 2,
      projectName: "Car rental management system",
      projectData: [
        {
          todoList: [],
          inProgressList: [],
          validateList: [],
          completeList: [],
        },
      ],
    },
  ];

  return (
    <div className="flex ">
      <Tabs defaultValue="signin" className="w-full flex flex-col gap-y-1.5">
        <TabsList className="grid grid-cols-4 grid-flow-row  items-center w-fit h-auto gap-2">
          {data.length > 0 &&
            data.map((value) => (
              <TabsTrigger
                key={value.id}
                value={value.id.toString()}
                className="px-12 flex items-center"
              >
                {value.projectName}
              </TabsTrigger>
            ))}

          <TabsTrigger value={"add"}>
            <Plus className="text-secondary bg-primary rounded-full" size={20} />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add" className="flex justify-center ">
            <CreateProject/>
        </TabsContent>

        {/* Data Content */}
        {data.length > 0 && data.map((value) => (
          <TabsContent 
              key={value.id}
              value={value.id.toString()}
          >
             <KanbanBoard/>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DashBoard;


