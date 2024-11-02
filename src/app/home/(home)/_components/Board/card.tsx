import { Dispatch, FC, SetStateAction } from "react";
import DropIndicator from "./drop-indicator";
import { motion } from "framer-motion";
import { EditMenu } from "./editMenu";
import { Task } from "@/interface/ITask";
interface CardProps {
  title: string;
  id: string;
  column: string;
  handleDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    card: { title: string; id: string; column: string }
  ) => void;
  projectId : number;
  setCards: Dispatch<SetStateAction<Task[]>>;
}

const TaskCard: FC<CardProps> = ({ title, id, column, handleDragStart, projectId, setCards }) => {

  return (
    <>
     <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        
      >
       <EditMenu 
          title={title} 
          projectId={projectId} 
          taskId={id}
          setCards={setCards}
       />
      </motion.div>
    </>
  );
};

export default TaskCard;
