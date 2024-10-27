
import React, { FC } from "react";
import AddTask from "./task-dialog";
import TaskCard from "./task-card";
import DropArea from "./drop-area";

interface dataItems {
  id: number;
  taskName: string;
}

interface TaskColumnProps {
  title: string;
  data: dataItems[];
  setActiveCard: (value: number | null) => void;
}

const TaskColumn: FC<TaskColumnProps> = ({ title, data, setActiveCard }) => {

  return (
    <div className="h-96 border rounded-lg shadow flex flex-col justify-center p-2">
      <div className="relative flex border-b py-1 w-full justify-center">
        <h1 className="font-medium">{title}</h1>
        <AddTask />
      </div>
      <div className="flex-1 flex flex-col py-2 gap-y-1.5">
        {data.map((value) => (
          <>
            <DropArea />
            <TaskCard
              key={value.id}
              taskId={value.id}
              taskName={value.taskName}
              setActiveCard={setActiveCard}
            /> 
          
          </>
        ))}
        {data.length > 0 && <DropArea /> } 
      </div>
    </div>
  );
};

export default TaskColumn;
