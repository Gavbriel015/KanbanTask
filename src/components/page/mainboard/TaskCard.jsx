import { motion } from 'framer-motion'

export default function TaskCard({ taskName, tasks, openModal }) {

  const handleClick = () => {
    openModal();
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
      onClick={handleClick} className="dark:bg-darkGray bg-white hoverTaskCard w-[280px] flex flex-col gap-1 shadow-[0px_4px_6px_rgba(54,78,126,0.101545)] rounded-lg p-4 cursor-pointer">      <h1 className="font-bold dark:text-white">{taskName}</h1>
      <p className="text-sm text-gray-400">{
        tasks.filter((task) => task.isCompleted).length
      } of {tasks.length} Subtasks</p>
    </motion.div>
  );
}