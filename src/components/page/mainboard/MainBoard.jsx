import ColumnTask from "./ColumnTask";

import { KanbanStore } from "../../../store/store";
import BoardFormModal from "../../modals/BoardFormModal";
import { useDisclosure } from "@chakra-ui/react";

export default function MainBoard() {

    const { selectedBoard } = KanbanStore();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const newBoard = useDisclosure();

    return (
        <div className="dark:bg-bgDarkGray overflow-x-auto overflow-y-auto h-screen max-h-[90vh] mainboard">
            {
                selectedBoard === null || selectedBoard === '' ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold text-gray-400">Create a new board to get started.</h1>
                            <button onClick={newBoard.onOpen} className='px-4 py-3 font-bold text-white rounded-full bg-mainPurple'>+ Create New Board</button>
                            <BoardFormModal isEditing={false} isOpen={newBoard.isOpen} onClose={newBoard.onClose} />
                        </div>
                    </div>
                ) : (
                    selectedBoard.columns.length > 0 ? (
                        <div
                            className="flex h-full gap-2 pt-2 mb-8n">
                            {
                                selectedBoard?.columns?.map((column, index) => (
                                    <ColumnTask key={index} columnName={column.name} />
                                )
                                )
                            }
                            <div onClick={onOpen} className="w-[250px] min-w-[250px] dark:bg-darkGray bg-white mt-8 ml-4 mb flex justify-center items-center p-10 cursor-pointer">
                                <p className="font-bold dark:text-mediumGray text-mainPurple">+ New Column</p>
                            </div>
                            <BoardFormModal isEditing={true} isOpen={isOpen} onClose={onClose} />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="flex flex-col items-center gap-2">
                                <h1 className="m-4 font-bold text-center text-gray-400">This board is empty. Create a new column to get started.</h1>
                                <button onClick={onOpen} className='px-4 py-3 font-bold text-white rounded-full bg-mainPurple'>+ Add New Column</button>
                            </div>
                            <BoardFormModal isEditing={true} isOpen={isOpen} onClose={onClose} />
                        </div>
                    )
                )
            }
        </div>

    )
}