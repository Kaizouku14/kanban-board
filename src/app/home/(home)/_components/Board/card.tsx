import { FC } from "react";
import DropIndicator from "./drop-indicator";
import { motion } from "framer-motion";
import { EditMenu } from "./editMenu";
interface CardProps {
  title: string;
  id: string;
  column: string;
  handleDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    card: { title: string; id: string; column: string }
  ) => void;
  projectId : number;
}

const TaskCard: FC<CardProps> = ({ title, id, column, handleDragStart, projectId }) => {
  return (
    <>
     <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        
      >
       <EditMenu title={title} projectId={projectId} />
      </motion.div>
    </>
  );
};

export default TaskCard;
