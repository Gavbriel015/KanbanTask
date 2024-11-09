import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Textarea,

    Select,
} from '@chakra-ui/react'

import InputColumn from '../page/InputColumn'

import { useRef, useState, useEffect } from 'react'

import { KanbanStore } from '../../store/store'


export default function TaskFormModal({ isEditing, isOpen, onClose, editingTask }) {

    const initialRef = useRef(null)
    const finalRef = useRef(null)


    const { selectedBoard, addNewTask, updateTask } = KanbanStore();

    const [taskData, setTaskData] = useState(editingTask ? editingTask : {
        title: '',
        description: '',
        subtasks: [{ title: '', isCompleted: false }],
        status: selectedBoard && selectedBoard.columns.length > 0 ? selectedBoard.columns[0].name : ''
    });

    useEffect(() => {
        if (!isEditing) {

            setTaskData({
                title: '',
                description: '',
                subtasks: [{ title: '', isCompleted: false }],
                status: selectedBoard && selectedBoard.columns.length > 0 ? selectedBoard.columns[0].name : '',
            });
        } else {
            setTaskData(editingTask);
        }
    }, [isEditing, editingTask, selectedBoard]);


    const handleInputs = (e) => {
        if (e.target.name === 'title' || e.target.name === 'description') {
            setTaskData({
                ...taskData,
                [e.target.name]: e.target.value,
            });
        } else if (e.target.name === 'column') {
            setTaskData({
                ...taskData,
                status: e.target.value,
            });
        }
    };

    const addColumn = () => {
        setTaskData({
            ...taskData,
            subtasks: [
                ...taskData.subtasks,
                {
                    title: 'New Subtask',
                    isCompleted: false,
                },
            ],
        });
    };

    const removeColumn = (index) => {
        const updatedSubtasks = [...taskData.subtasks];
        updatedSubtasks.splice(index, 1);
        setTaskData({
            ...taskData,
            subtasks: updatedSubtasks,
        });
    };

    const handleSubmit = () => {
        if (isEditing) {
            updateTask(editingTask.title, taskData);

        } else {
            addNewTask(taskData);
        }
        onClose();
    };

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
                    <ModalHeader className='font-bold dark:bg-darkGray dark:text-white'>{isEditing ? 'Edit Task' : 'Add task'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='dark:bg-darkGray' pb={6}>
                        <FormControl>
                            <FormLabel className='font-semibold text-mediumGray dark:text-white' fontSize={'15px'}>Title</FormLabel>

                            <Input className='dark:text-white ' value={taskData.title} onChange={handleInputs} name='title' ref={initialRef} placeholder='e.g. Take a coffee break' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel className='font-semibold text-mediumGray dark:text-white' fontSize={'15px'}>Description</FormLabel>

                            <Textarea className='dark:text-white' value={taskData.description} onChange={handleInputs} name='description' placeholder='e.g. It’s always good to take a break. This 15 minute break will 
                                recharge the batteries a little.' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel className='text-mediumGray dark:text-white' fontSize={'15px'}>SubTasks</FormLabel>

                            <div className='flex flex-col gap-2'>
                                {taskData.subtasks.map((column, index) => (
                                    <InputColumn
                                        removeColumn={removeColumn}
                                        key={index}
                                        handleInputs={(e) => {
                                            const updatedSubtasks = [...taskData.subtasks];
                                            updatedSubtasks[index] = {
                                                ...updatedSubtasks[index],
                                                title: e.target.value,
                                            };
                                            setTaskData({
                                                ...taskData,
                                                subtasks: updatedSubtasks,
                                            });
                                        }}
                                        value={column.title}
                                        nameColumn={column.title}
                                        onRemove={() => removeColumn(index)}
                                    />
                                ))}
                            </div>

                        </FormControl>

                        <div>
                            <button onClick={addColumn} className='mb-2 mt-8 w-full bg-[#635FC7] hover:bg-opacity-35 bg-opacity-20 px-4 py-2 rounded-full text-mainPurple font-bold' >+ Add New Subtask</button>

                        </div>
                        <FormControl mt={4}>
                            <FormLabel className='text-mediumGray' fontSize={'15px'}>Status</FormLabel>
                            <Select className='dark:text-white' disabled={isEditing} value={taskData.status} onChange={handleInputs} name='column'>
                                {selectedBoard && selectedBoard.columns.map((column, index) => (
                                    <option className='dark:bg-darkGray' key={index} value={column.name}>
                                        {column.name}
                                    </option>
                                ))}
                            </Select>

                        </FormControl>

                        <button onClick={() => handleSubmit()} className='hover:bg-[#A8A4FF] mt-4 w-full bg-[#635FC7] px-4 py-2 rounded-full text-white font-bold' >{isEditing ? 'Save Changes' : 'Create Task'}</button>


                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
