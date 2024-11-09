import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';

import optionsIcon from '../../assets/icon-vertical-ellipsis.svg';

import { KanbanStore } from '../../store/store';
import { useDisclosure } from '@chakra-ui/react';
import BoardFormModal from '../modals/BoardFormModal';
import DeleteModal from '../modals/DeleteModal';
import TaskFormModal from '../modals/TaskFormModal';
import MainBoard from './mainboard/MainBoard';
import CreateBoardButton from './CreateBoardButton';
import { useState, useEffect } from 'react';
import SwitchTheme from './SwitchTheme';

export default function TopBar() {

  const { boards, setSelectedBoard } = KanbanStore();

  const boardFormDisclosure = useDisclosure();
  const deleteModalDisclosure = useDisclosure();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: isOpenBoard, onClose: onCloseBoard, onOpen: onOpenBoard } = useDisclosure();
  const { isOpen: isOpenNewBoard, onClose: onCloseNewBoard, onOpen: onOpenNewBoard } = useDisclosure();

  const { selectedBoard } = KanbanStore();
  const [selectedButton, setSelectedButton] = useState(boards.length > 0 ? boards[0].name : null);


  const handleBoard = (name) => {
    boards.map(board => {
      if (board.name === name) {
        setSelectedBoard(board);
        setSelectedButton(name);
      }
      
    })
    onCloseBoard();
  }
  useEffect(() => {
    const selectedBoardExists = boards.some((board) => board.name === selectedButton);
    if (!selectedBoardExists || boards.length === 0) {
      setSelectedButton(boards.length > 0 ? boards[0].name : null);
    }
  }, [boards, selectedButton]);


  return (
    <>
      {/* DESKTOP */}
      <div className='hidden sm:flex dark:bg-darkGray  w-full  justify-between items-center px-10 h-[95px] bg-white'>
        <div>
          <h1 className='text-2xl font-bold dark:text-white'>{selectedBoard ? selectedBoard.name : ''}</h1>
        </div>
        <div className='flex items-center justify-center gap-4 dark:bg-darkGray'>
          <button onClick={onOpen} className='px-4 py-3 text-white rounded-full bg-mainPurple' >+ Add New Task</button>
          <TaskFormModal isOpen={isOpen} onClose={onClose} />

          <Menu>
            <MenuButton>
              <img src={optionsIcon} alt='' />
            </MenuButton>
            <MenuList className='dark:!bg-darkGray dark:!border-darkGray'>
              <MenuItem className='dark:!bg-darkGray dark:!text-mediumGray' onClick={boardFormDisclosure.onOpen}>Edit Board</MenuItem>
              <BoardFormModal isEditing={true} onClose={boardFormDisclosure.onClose} isOpen={boardFormDisclosure.isOpen} />
              <MenuItem className='dark:!bg-darkGray' onClick={deleteModalDisclosure.onOpen}>
                <p className='text-red-400'>Delete Board</p>
              </MenuItem>
              <DeleteModal type={'BOARD'} onClose={deleteModalDisclosure.onClose} isOpen={deleteModalDisclosure.isOpen} />
            </MenuList>
          </Menu>
        </div>
      </div>


      {/* MOBILE */}
      <div className={`dark:bg-darkGray sm:hidden w-full flex justify-between items-center px-4 h-[95px] bg-white`}>
        <div className='flex items-center gap-3'>
          <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg"><g fill="#635FC7" fillRule="evenodd"><rect width="6" height="25" rx="2" /><rect opacity=".75" x="9" width="6" height="25" rx="2" /><rect opacity=".5" x="18" width="6" height="25" rx="2" /></g></svg>
          <div onClick={onOpenBoard} className='flex items-center gap-2'>
            <h1 className='text-xl font-bold dark:text-white'>{selectedBoard ? selectedBoard.name : ''}</h1>
            <svg className='scale-150 ' width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" /></svg>
          </div>
          <Modal size={'sm'} isOpen={isOpenBoard} onClose={onCloseBoard}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader className='dark:bg-darkGray'>
                <p className='text-sm tracking-[2px] mb-3 text-gray-400'>ALL BOARDS ({boards.length}) </p>
              </ModalHeader>

              <ModalBody className='dark:bg-darkGray' padding={0} paddingRight={8}>
                <div className='pb-6'>


                  {
                    boards.map(board => (
                      <CreateBoardButton onClick={() => handleBoard(board.name)} key={board.name} name={board.name} selected={selectedButton === board.name} />
                    ))
                  }
                  <button className='flex items-center gap-4 p-4 px-6 py-3 rounded-r-full index hover:bg-opacity-20 hover:bg-mainPurple cursor-pointerhover:bg-opacity-20 hover:text-mainPurple' onClick={onOpenNewBoard}>
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill='gray' /></svg>
                    <span className='font-bold text-mainPurple font-hover'>+ Create New Board</span></button>
                  <BoardFormModal isOpen={isOpenNewBoard} onClose={onCloseNewBoard} />
                  <div className='pt-3'>
                    <SwitchTheme />
                  </div>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>

        </div>
        <div className='flex items-center justify-center gap-4'>
          <button onClick={onOpen} className='px-4 py-1 text-xl font-bold text-white rounded-full bg-mainPurple' >+</button>
          <TaskFormModal isOpen={isOpen} onClose={onClose} />
          <Menu>
            <MenuButton>
              <img src={optionsIcon} alt='' />
            </MenuButton>
            <MenuList className='dark:!bg-darkGray dark:!border-darkGray'>
              <MenuItem className='dark:!bg-darkGray dark:!text-mediumGray' onClick={boardFormDisclosure.onOpen}>Edit Board</MenuItem>
              <BoardFormModal isEditing={true} onClose={boardFormDisclosure.onClose} isOpen={boardFormDisclosure.isOpen} />
              <MenuItem className='dark:!bg-darkGray' onClick={deleteModalDisclosure.onOpen}>
                <p className='text-red-400'>Delete Board</p>
              </MenuItem>
              <DeleteModal type={'BOARD'} onClose={deleteModalDisclosure.onClose} isOpen={deleteModalDisclosure.isOpen} />
            </MenuList>
          </Menu>
        </div>
      </div>












      <MainBoard />
    </>
  );
}
