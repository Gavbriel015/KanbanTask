import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Heading,
    FormControl,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    FormLabel,
    Select,

} from '@chakra-ui/react';
import optionsIcon from '../../assets/icon-vertical-ellipsis.svg';

import { KanbanStore } from '../../store/store';
import { useRef, useState } from "react"

import SubTaskCheckbox from '../page/SubTaskCheckbox';
import { useDisclosure } from '@chakra-ui/react';
import DeleteModal from './DeleteModal';
import TaskFormModal from './TaskFormModal';

export default function TaskInfoModal({ isOpen, onClose, selectedTask }) {

    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const { selectedBoard, deleteTask, updateColumn, updateTask } = KanbanStore();
    const [editingTask, setEditingTask] = useState(null);

    const { isOpen: isDeleteOpen, onClose: onDeleteClose, onOpen: onDeleteOpen } = useDisclosure();
    const { isOpen: isEditOpen, onClose: onEditClose, onOpen: onEditOpen } = useDisclosure();

    const handleDeleteTask = () => {
        onDeleteOpen();

    }

    const handleEditTask = () => {
        setEditingTask(selectedTask);   
        onEditOpen();
        
    }

    const handleColumnChange = (event) => {
        const newColumn = event.target.value;
        updateColumn(selectedTask, newColumn);
        updateTask(selectedTask.title, {
            ...selectedTask,
            status: newColumn,
        })
        onClose();
    };

    const handleEditClose = () => {
        onEditClose();
        onClose();
    }

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered={true}
            >
                <ModalOverlay />
                <ModalContent>

                    <div className='dark:bg-darkGray flex justify-between p-6'>
                        <Heading size={'md'} className=' mr-8 dark:text-white'>{ selectedTask ? selectedTask.title : ""}</Heading>
                        <Menu>
                            <MenuButton className=''>
                                <img className='min-w-[4px]' src={optionsIcon} alt='options' />
                            </MenuButton>
                            <MenuList className='dark:!bg-darkGray dark:!border-darkGray'>
                                <MenuItem  onClick={() => handleEditTask()} className='text-mediumGray font-normal dark:!bg-darkGray dark:!border-darkGray'><p className='dark:text-mediumGray'>Edit Task</p></MenuItem>

                                <TaskFormModal editingTask={selectedTask} isEditing={true} isOpen={isEditOpen} onClose={handleEditClose} />

                                <MenuItem className='dark:!bg-darkGray dark:!border-darkGray' onClick={handleDeleteTask}><p className='text-mainRed '>Delete Task</p></MenuItem>

                                <DeleteModal onCancel={onDeleteClose} onDelete={() => {
                                    deleteTask(selectedTask);
                                    onClose();
                                }} isOpen={isDeleteOpen} onClose={onDeleteClose} type={'TASK'} taskName={selectedTask && selectedTask.title} taskDelete={() => deleteTask(selectedTask)} />
                            </MenuList>
                        </Menu>
                    </div>
                    <ModalBody pb={6} className='dark:bg-darkGray' >
                        <FormControl>
                            <p className='text-mediumGray leading-7 text-[15px]'>{selectedTask && selectedTask.description}</p>
                        </FormControl>
                        <FormControl mt={4}>
                            <p className='font-bold text-mediumGray text-sm'>Subtasks (
                                {selectedTask &&
                                    selectedTask.subtasks.filter((subtask) => subtask.isCompleted).length} of   {selectedTask && selectedTask.subtasks.length})</p>
                            <div className='mt-4'>
                                {
                                    selectedTask && selectedTask.subtasks.map((subtask) => (
                                        <SubTaskCheckbox key={subtask.title} title={subtask.title} isCompleted={subtask.isCompleted} />
                                    )
                                    )
                                }
                            </div>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel className='text-mediumGray' fontSize={'15px'}>Status</FormLabel>
                            <Select className='dark:bg-darkGray dark:text-white' value={selectedTask ? selectedTask.status : ""} onChange={handleColumnChange}>
                                {selectedBoard.columns.map((column, index) => (
                                    <option className='focus:bg-darkGray' key={index} value={column.name}>
                                        {column.name}
                                    </option>
                                ))}
                            </Select>

                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}