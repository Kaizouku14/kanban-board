"use client";

import React, { useState } from "react";
import TaskColumn from "./task-column";

const initialItems = [
  {
    id: 1,
    title: "TO-DO LIST",
    data: [{ id : 1, taskName: "task 1" }, { id: 2, taskName: "task 2" }],
  },
  {
    id: 2,
    title: "WORK IN PROGRESS",
    data: [{ id : 1,  taskName: "task 3" }, { id : 2, taskName: "task 4" }],
  },
  {
    id: 3,
    title: "VALIDATE",
    data: [{ id : 1, taskName: "task 5" }, {  id : 2 , taskName: "task 6" }],
  },
  {
    id: 4,
    title: "COMPLETE",
    data: [{ id : 1, taskName: "task 7" }, { id : 2, taskName: "task 8" }],
  },
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialItems);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const onDrop = (columnTitle: string, index: number) => {
    console.log(`${activeCard} is going to place into ${columnTitle} at position ${index}`);

    if (activeCard === null || activeCard === undefined) return;

   
  };


  return (
    <>
      <div className="grid grid-cols-4 gap-x-4">
        {tasks.map((value, index) => (
          <TaskColumn
            key={index}
            title={value.title}
            data={value.data}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />
        ))}
      </div>
    </>
  );
};

export default KanbanBoard;
