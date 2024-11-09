import { Checkbox } from "@chakra-ui/react"
import { useState } from "react";
import { KanbanStore } from "../../store/store";

export default function SubTaskCheckbox({ isCompleted, title}) {
  
  const [isChecked, setIsChecked] = useState(isCompleted);
  const { updateCountSubtasks } = KanbanStore();


  const handleChange = () => {
    setIsChecked(!isChecked);
    updateCountSubtasks(title);
  }


  return (
    <div
      onChange={handleChange}
      className={`hover:bg-mainPurple hover:bg-opacity-20 hover:cursor-pointer font-bold flex ${isChecked ? "line-through text-mediumGray " : ""
        }`}
    >
      <Checkbox
        className="px-4 py-2"
        colorScheme={"purple"}
        defaultChecked={isChecked}

      >
        <p className="dark:text-white pl-2 font-bold text-[15px]">{title}</p>
      </Checkbox>
    </div>
  );
}
