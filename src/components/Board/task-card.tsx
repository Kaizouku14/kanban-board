import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface TaskCardProps {
  index : number;
  taskName: string;
  taskDescription?: string;
  setActiveCard: (value: number | null) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  index,
  taskName,
  taskDescription,
  setActiveCard,
}) => {
  
  return (
    <Card
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
      className="active:border-red-600"
    >
      <CardHeader>
        <CardTitle>{taskName}</CardTitle>
        {taskDescription && (
          <CardDescription>{taskDescription}</CardDescription>
        )}
      </CardHeader>
    </Card>
  );
};

export default TaskCard;
