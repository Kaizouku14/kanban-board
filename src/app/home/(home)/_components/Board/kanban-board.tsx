"use client";

import React, { FC, useState } from "react";
import Column from "./task-column";
import { Task } from "@/interface/ITask";

interface ProjectTaskData {
  projectId: number;
  items: Task[];
}

const KanbanBoard: FC<ProjectTaskData> = ({ projectId, items }) => {
  const [cards, setCards] = useState<Task[]>(items);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 w-full md:p-4">
      <Column
        projectId={projectId}
        title="TO-DO LIST"
        column="todo"
        headingColor="dark:text-neutral-200 "
        cards={cards}
        setCards={setCards}
      />
      <Column
        projectId={projectId}
        title="WORK IN PROGRESS"
        column="in-progress"
        headingColor="dark:text-yellow-200 text-yellow-400"
        cards={cards}
        setCards={setCards}
      />
      <Column
        projectId={projectId}
        title="Validate"
        column="validate"
        headingColor="dark:text-blue-200 text-blue-600"
        cards={cards}
        setCards={setCards}
      />
      <Column
        projectId={projectId}
        title="Complete"
        column="done"
        headingColor="dark:text-emerald-200 text-emerald-400"
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
};

export default KanbanBoard;
