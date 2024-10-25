import React from "react";
import AddTask from "./task-dialog";

const KanbanBoard = () => {
  return (
    <div className="grid grid-cols-4 gap-x-4">
      <div className="h-96 border rounded-lg shadow flex flex-col justify-center p-2">
        <div className="relative flex border-b py-1 w-full justify-center">
          <h1 className="font-medium">TO-DO LIST</h1>
          <AddTask/>
        </div>
        <div className="flex-1 flex-col ">  
          {/* TO-DO list items will go here */}
        </div>
      </div>

      <div className="h-96 border rounded-lg shadow flex flex-col justify-center p-2">
        <h1 className="border-b py-1 w-full text-center font-medium">WORK IN PROGRESS</h1>
        <div className="flex-1 flex-col"></div>
      </div>

      <div className="h-96 border rounded-lg shadow flex flex-col justify-center p-2">
        <h1 className="border-b py-1 w-full text-center font-medium">VALIDATE</h1>
        <div className="flex-1 flex-col"></div>
      </div>

      <div className="h-96 border rounded-lg shadow flex flex-col justify-center p-2">
        <h1 className="border-b py-1 w-full text-center font-medium">COMPLETE</h1>
        <div className="flex-1 flex-col"></div>
      </div>
    </div>
  );
};

export default KanbanBoard;
