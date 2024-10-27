"use client";

import React, { useState } from "react";
import TaskColumn from "./task-column";

const items = [
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
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-4 gap-x-4">
        {items.map((value) => (
          <TaskColumn
            key={value.id}
            title={value.title}
            data={value.data}
            setActiveCard={setActiveCard}
          />
        ))}
      </div>

      <h1 className="text-white">{activeCard}</h1>
    </>
  );
};

export default KanbanBoard;
