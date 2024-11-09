import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,

    Button,
} from '@chakra-ui/react'

import { KanbanStore } from '../../store/store'
const BOARD = 'BOARD'



export default function DeleteModal({ isOpen, onClose, type, taskName, onDelete }) {

    const { selectedBoard, deleteBoard } = KanbanStore();

    const handleDelete = () => {
        if (type === BOARD) {
            deleteBoard();
        } else {

            onDelete();
        }
        onClose();
    };
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered={true}

            >
                <ModalOverlay />
                <ModalContent className='dark:bg-darkGray'>
                    <ModalHeader className='font-bold text-red-500 dark:bg-darkGray'>
                        {type === BOARD ? 'Delete Board' : 'Delete Task'}
                    </ModalHeader>
                    <ModalBody className='dark:bg-darkGray'>
                        <p className='text-mediumGray text-[13px]'>
                            {
                                type === BOARD ?
                                    selectedBoard ?
                                        `Are you sure you want to delete the ${selectedBoard.name} board? This action will remove all columns and tasks and cannot be reversed` :
                                        `No board selected.` :
                                    `Are you sure you want to delete the '${taskName}' task and its subtasks? This action cannot be reversed.`
                            }
                        </p>
                        <div className='flex gap-2 px-4 mt-5 mb-5 dark:bg-darkGray'>
                            <button onClick={handleDelete} className='w-full px-4 py-2 font-bold text-white rounded-full hover:bg-hoverRed bg-mainRed'>Delete</button>
                            <button onClick={onClose} className='w-full bg-[#635FC7] hover:bg-opacity-35 bg-opacity-20 px-4 py-2 rounded-full text-mainPurple font-bold'>Cancel</button>
                        </div>
                    </ModalBody>



                </ModalContent>
            </Modal>
        </>
    )
}