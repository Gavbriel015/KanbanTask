import { KanbanStore } from "../../../store/store";
import TaskInfoModal from "../../modals/TaskInfoModal";
import TaskCard from "./TaskCard";

import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function ColumnTask({ columnName }) {
  const { selectedBoard } = KanbanStore();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [selectedTask, setSelectedTask] = useState(null);

  const handleClick = (task) => {
    onOpen();
    setSelectedTask(task);
  };

  let tasks = [];

  if (selectedBoard) {
    for (const column of selectedBoard.columns) {
      if (column.name === columnName) {
        tasks = column.tasks || [];
        break;
      }
    }
  }

  return (
    <div className="w-[280px] min-w-[280px] mx-2 p-2">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-mainPurple"></div>
        <p className="font-semibold uppercase dark:text-mediumGray" >
          {columnName} (<span>{tasks.length}</span>)
        </p>
      </div>
      <div className="flex flex-col gap-6 pt-4">
        <AnimatePresence>
          {tasks.map((task,index) => (
            <TaskCard
              openModal={() => handleClick(task)}
              key={index}
              taskName={task.title}
              tasks={task.subtasks}
            />
          ))}
        </AnimatePresence>
        <TaskInfoModal isOpen={isOpen} onClose={onClose} selectedTask={selectedTask} />
      </div>

    </div>
  );
}
