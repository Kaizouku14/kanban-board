import CreateProject from "@/components/Forms/create-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

const DashBoard = () => {
  const data = [
    {
      id: 1,
      projectName: "ProjectName",
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
      projectName: "ProjectName2",
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
        <TabsList className="flex flex-wrap justify-between items-center w-fit gap-x-2">
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
              {value.projectName}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DashBoard;


{/* <div className="h-96 border rounded-lg shadow flex flex-col justify-center p-2">
<h1 className="border-b py-1 w-full text-center">TO-DO LIST</h1>
<div className="flex flex-col h-full"></div>
</div>

<div className="h-96 border rounded-lg shadow flex flex-col justify-center p-2">
<h1 className="border-b py-1 w-full text-center">
  WORK IN PROGRESS
</h1>
<div className="flex flex-col h-full"></div>
</div>

<div className="h-96 border rounded-lg shadow flex flex-col justify-center p-2">
<h1 className="border-b py-1 w-full text-center">VALIDATE</h1>
<div className="flex flex-col h-full"></div>
</div>

<div className="h-96 border rounded-lg shadow flex flex-col justify-center p-2">
<h1 className="border-b py-1 w-full text-center">COMPLETE</h1>
<div className="flex flex-col h-full"></div>
</div> */}