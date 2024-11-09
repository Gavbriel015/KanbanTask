import iconHideBar from '../../assets/icon-hide-sidebar.svg'
import iconShowBar from '../../assets/icon-show-sidebar.svg'

import { KanbanStore } from '../../store/store'
import CreateBoardButton from './CreateBoardButton'
import { useDisclosure } from '@chakra-ui/react'
import BoardFormModal from '../modals/BoardFormModal'
import { useState, useEffect, useRef } from 'react'
import LogoKanban from './LogoKanban'
import SwitchTheme from './SwitchTheme'
import { motion } from 'framer-motion'

export default function SideBar() {
    const { boards, setSelectedBoard, selectedBoard } = KanbanStore();
    const { isOpen, onClose, onOpen } = useDisclosure();

    const [selectedButton, setSelectedButton] = useState(boards.length > 0 ? boards[0].name : null);
    const [hideBar, setHideBar] = useState(false)
    const [showBar, setShowBar] = useState(true)

    const initialSelectedBoardName = useRef(null);
    

    const handleBoard = (name) => {
        boards.map(board => {
            if (board.name === name) {
                setSelectedBoard(board);
                setSelectedButton(name);
                initialSelectedBoardName.current = name;
            }
        })
    }

    useEffect(() => {
        const getIndexBoard = boards.findIndex(board => board.name === selectedBoard.name);
    
        if (getIndexBoard === -1) {
            setSelectedButton(boards.length > 0 ? boards[0].name : null);
        } else {
            setSelectedButton(selectedBoard.name);
        }
    
    }, [boards, selectedBoard]);
    

    return (
        <div className='relative hidden sm:flex dark:bg-darkGray'>
            <motion.div 
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: hideBar ? 0 : 1, x: hideBar ? -300 : 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            style={{ display: hideBar ? 'none' : 'flex' }}
                className='dark:bg-darkGray w-[300px] min-w-[250px] flex flex-col h-screen justify-between pb-10'>
                <div>
                    <div>
                        <LogoKanban />
                    </div>
                    <div className='flex flex-col'>
                        <p className='dark:text-mediumGray text-sm tracking-[2px] pl-8 mb-3 mt-3'>ALL BOARDS ({boards.length}) </p>
                        {
                            boards.map(board => (
                                <CreateBoardButton onClick={() => handleBoard(board.name)} key={board.name} name={board.name} selected={selectedButton === board.name} />
                            ))
                        }
                        <button className='flex items-center gap-4 p-4 px-6 py-3 rounded-r-full index hover:bg-opacity-20 hover:bg-mainPurple cursor-pointerhover:bg-opacity-20 hover:text-mainPurple' onClick={onOpen}>
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill='gray' /></svg>
                            <span className='font-bold text-mainPurple font-hover'>+ Create New Board</span></button>
                        <BoardFormModal isOpen={isOpen} onClose={onClose} />
                    </div>

                </div>

                <div>
                    <SwitchTheme />
                    <div onClick={() => {
                        setHideBar(true);
                        setShowBar(false);
                    }} className='flex items-center justify-center gap-2 p-2 pl-4 m-2 rounded-full cursor-pointer hover:bg-mainPurple hover:bg-opacity-20 ' >
                        <img alt="" src={iconHideBar} />
                        <h2 className='font-bold text-gray-500'>Hide Sidebar</h2>
                    </div>

                </div>

            </motion.div>
            {/* SIDEBAR END */}
            <div hidden={showBar} onClick={() => {
                setHideBar(false);
                setShowBar(true);
            }} className='fixed left-0 items-center justify-center hidden w-12 h-12 cursor-pointer sm:flex bg-mainPurple bottom-5 rounded-r-3xl'>
                <img src={iconShowBar} alt="" />
            </div>
        </div>
    )
}
