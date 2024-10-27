"use client";

import React, { useState } from "react";
import Column from "./task-column";

const DEFAULT_CARDS = [
  // TODO
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
  { title: "Sync with product on Q3 roadmap", id: "7", column: "validate" }, 
  { title: "Document Notifications service", id: "4", column: "validate" },
  { title: "Postmortem for outage", id: "6", column: "validate" },

  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];

export interface Card {
  title: string;
  id: string;
  column: string;
}

const KanbanBoard = () => {
  const [cards, setCards] = useState<Card[]>(DEFAULT_CARDS);

  return (
    <div className="grid grid-cols-4 w-full  p-4">
      <Column
        title="TO-DO LIST"
        column="todo"
        headingColor="dark:text-neutral-200 "
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="WORK IN PROGRESS"
        column="in-progress"
        headingColor="dark:text-yellow-200 text-yellow-400"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Validate"
        column="validate"
        headingColor="dark:text-blue-200 text-blue-600"
        cards={cards}
        setCards={setCards}
      />
      <Column
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
