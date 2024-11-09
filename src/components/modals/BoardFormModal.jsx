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
  FormErrorMessage,
} from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import InputColumn from '../page/InputColumn';
import { KanbanStore } from '../../store/store';
import { checkRepeatedValue } from '../../utils/utils';

export default function BoardFormModal({ isOpen, onClose, isEditing }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { addNewBoard, selectedBoard, updateBoard, setSelectedBoard, boards } = KanbanStore();

  const [errorName, setErrorName] = useState(false);
  const [errorColumns, setErrorColumns] = useState(false);

  const [boardData, setBoardData] = useState({
    name: '',
    columns: [
      {
        name: 'Column Name',
        tasks: [],
      },
    ],
  });

  const handleCloseModal = () => {
    setErrorName(false);
    setErrorColumns(false);
    onClose();
  };

  useEffect(() => {
    if (isEditing && selectedBoard) {
      setBoardData(selectedBoard);
    } else {
      setBoardData({
        name: '',
        columns: [
          {
            name: 'Column Name',
            tasks: [],
          },
        ],
      });
    }
  }, [isEditing, selectedBoard]);

  const handleNewBoard = () => {
    const isDuplicateName = isEditing && selectedBoard
      ? boards.some((board) => board !== selectedBoard && board.name === boardData.name.trim())
      : checkRepeatedValue('board', boardData.name, boards);

    const columnNames = boardData.columns.map((column) => column.name.trim());
    const hasDuplicateColumns = new Set(columnNames).size !== columnNames.length || columnNames.some(name => name === '');

    if (isDuplicateName || boardData.name.trim() === '') {
      setErrorName(true);
      return;
    }

    if (hasDuplicateColumns) {
      setErrorColumns(true);
      return;
    }

    if (isEditing && selectedBoard) {
      updateBoard(selectedBoard, boardData);
      setSelectedBoard(boardData);
    } else {
      addNewBoard(boardData);
    }

    handleCloseModal();
    setBoardData({
      name: '',
      columns: [
        {
          name: 'Column Name',
          tasks: [],
        },
      ],
    });
};
  

  const handleInputs = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      setBoardData({
        ...boardData,
        name: value,
      });
    } else if (name === 'columns') {
      const newColumns = value.split(',').map(columnName => ({
        name: columnName.trim(),
        tasks: [],
      }));
      setBoardData({
        ...boardData,
        columns: newColumns,
      });
    }
  };

  const addColumn = () => {
    setBoardData({
      ...boardData,
      columns: [
        ...boardData.columns,
        {
          name: 'New Column',
          tasks: [],
        },
      ],
    });
  };

  const removeColumn = (index) => {
    const updatedColumns = [...boardData.columns];
    updatedColumns.splice(index, 1);
    setBoardData({
      ...boardData,
      columns: updatedColumns,
    });
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={handleCloseModal}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className='font-bold dark:bg-darkGray dark:text-white'>
          {isEditing ? 'Edit Board' : 'Add new board'}
        </ModalHeader>
        <ModalCloseButton onClick={handleCloseModal} />

        <ModalBody className='dark:bg-darkGray' pb={6}>
          <FormControl isInvalid={errorName}>
            <FormLabel className='dark:text-white text-mediumGray' fontSize={'15px'}>
              Name
            </FormLabel>
            <Input
              className='dark:text-white'
              name='name'
              onChange={handleInputs}
              ref={initialRef}
              placeholder='e.g. Web Design'
              value={boardData.name}
            />
            {errorName && (
              <FormErrorMessage>
                The field is empty or already exists.
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={errorColumns} mt={4}>
            <FormLabel className='text-mediumGray' fontSize={'15px'}>
              Columns
            </FormLabel>
            <div className='flex flex-col gap-2'>
              {boardData.columns.map((column, index) => (
                <InputColumn
                  removeColumn={removeColumn}
                  key={index}
                  handleInputs={(e) => {
                    const updatedColumns = [...boardData.columns];
                    updatedColumns[index] = {
                      ...updatedColumns[index],
                      name: e.target.value,
                    };
                    setBoardData({
                      ...boardData,
                      columns: updatedColumns,
                    });
                  }}
                  value={column.name}
                  nameColumn={column.name}
                  onRemove={() => removeColumn(index)}
                />
              ))}
            </div>
            {errorColumns && (
              <FormErrorMessage>
                Two or more columns have the same name or an empty name.
              </FormErrorMessage>
            )}
          </FormControl>

          <div>
            <button
              onClick={addColumn}
              className='mb-2 mt-8 w-full bg-[#635FC7] hover:bg-opacity-35 bg-opacity-20 px-4 py-2 rounded-full text-mainPurple font-bold'
            >
              + Add New Column
            </button>
            <button
              onClick={handleNewBoard}
              className='hover:bg-[#A8A4FF] mt-4 w-full bg-[#635FC7] px-4 py-2 rounded-full text-white font-bold'
            >
              {isEditing ? 'Save Changes' : 'Create New Board'}
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
