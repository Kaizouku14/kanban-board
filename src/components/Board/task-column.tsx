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
  onDrop: (title: string, index: number) => void;
}

const TaskColumn: FC<TaskColumnProps> = ({
  title,
  data,
  setActiveCard,
  onDrop,
}) => {
  return (
    <div className="h-96 border rounded-lg shadow flex flex-col justify-center p-2">
      <div className="relative flex border-b py-1 w-full justify-center">
        <h1 className="font-medium">{title}</h1>
        <AddTask />
      </div>


      <div className="flex-1 flex flex-col py-2 gap-y-1.5">
        {data.length && <DropArea onDrop={() => onDrop(title, 0)} />} 
        {data.map((value, index) => (
          <>
            <TaskCard
              key={value.id}
              index={index}
              taskName={value.taskName}
              setActiveCard={setActiveCard}
            />
            <DropArea onDrop={() => onDrop(title, index + 1)} />
          </>
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
