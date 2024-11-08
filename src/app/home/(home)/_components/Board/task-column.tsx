import { FC, useState } from "react";
import DropIndicator from "./drop-indicator";
import TaskCard from "./card";
import AddCard from "./add-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Task } from "@/interface/ITask";
import { api } from "@/app/_trpc/client";
import { toast } from "sonner";

interface ColumnProps {
  projectId: number;
  title: string;
  headingColor: string;
  column: string;
  cards: Task[];
  setCards: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Column: FC<ColumnProps> = ({
  projectId,
  title,
  headingColor,
  cards,
  column,
  setCards,
}) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: Task) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);
      const moveToBack = before === "-1";

      udpateData(cardToTransfer.id, cardToTransfer.column);

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === -1) return;
        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
      setCards(copy);
    }
  };

  const updateTaskMutation = api.kanban.savedChanges.useMutation();
  const udpateData = async (id: string, column: string) => {
    const projectTaskID = projectId;
    toast.promise(
      updateTaskMutation.mutateAsync({
        projectId: projectTaskID,
        id: id,
        column: column,
      }),
      {
        error: (error: unknown) => {
          return (error as Error).message;
        },
      }
    );
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();

    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: HTMLElement[]
  ) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll<HTMLDivElement>(`[data-column="${column}"]`)
    );
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-full md:w-72 shrink-0">
      <div className="mb-3 flex items-center justify-between px-2.5">
        <h3 className={`font-medium max-md:text-sm ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <ScrollArea className="h-80 w-full">
        {" "}
        <div
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`w-full transition-colors rounded px-2.5 ${
            active ? "dark:bg-neutral-800/50 bg-gray-200/50" : "bg-transparent"
          }`}
        >
          {filteredCards.map((c) => (
            <TaskCard
              key={c.id}
              {...c}
              handleDragStart={handleDragStart}
              projectId={projectId}
              setCards={setCards}
            />
          ))}
          <DropIndicator beforeId={null} column={column} />
          <AddCard projectId={projectId} column={column} setCards={setCards} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default Column;
