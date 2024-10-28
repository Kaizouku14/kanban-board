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
        { title: "Look into render bug in dashboard", id: "1", column: "todo" },
        { title: "SOX compliance checklist", id: "2", column: "todo" },
        { title: "[SPIKE] Migrate to Azure", id: "3", column: "todo" },

        // DOING
        {
          title: "Refactor context providers to use Zustand",
          id: "8",
          column: "in-progress",
        },
        { title: "Add logging to daily CRON", id: "9", column: "in-progress" },

        // VALIDATE
        {
          title: "Research DB options for new microservice",
          id: "5",
          column: "validate",
        },
        {
          title: "Sync with product on Q3 roadmap",
          id: "7",
          column: "validate",
        },
        {
          title: "Document Notifications service",
          id: "4",
          column: "validate",
        },
        { title: "Postmortem for outage", id: "6", column: "validate" },

        // DONE
        {
          title: "Set up DD dashboards for Lambda listener",
          id: "10",
          column: "done",
        },
      ],
    },
    {
      id: 2,
      projectName: "Car rental management system",
      projectData: [
        { title: "Look into render bug in dashboard", id: "1", column: "todo" },
        { title: "SOX compliance checklist", id: "2", column: "todo" },
        { title: "[SPIKE] Migrate to Azure", id: "3", column: "todo" },
        {
          title: "Refactor context providers to use Zustand",
          id: "8",
          column: "in-progress",
        },
        { title: "Add logging to daily CRON", id: "9", column: "in-progress" },

        // VALIDATE
        {
          title: "Research DB options for new microservice",
          id: "5",
          column: "validate",
        },
        {
          title: "Sync with product on Q3 roadmap",
          id: "7",
          column: "validate",
        },
        {
          title: "Document Notifications service",
          id: "4",
          column: "validate",
        },
        { title: "Postmortem for outage", id: "6", column: "validate" },

        // DONE
        {
          title: "Set up DD dashboards for Lambda listener",
          id: "10",
          column: "done",
        },
      ],
    },
  ];

  return (
    <div className="flex">
      <Tabs defaultValue="add" className="w-full flex flex-col gap-y-1.5">
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
        {data.length > 0 &&
          data.map((value) => (
            <TabsContent key={value.id} value={value.id.toString()}>
              <KanbanBoard data={value.projectData} />
            </TabsContent>
          ))}
      </Tabs>
    </div>
  );
};

export default DashBoard;
