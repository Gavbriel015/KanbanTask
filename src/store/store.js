import { create } from 'zustand';
import data from '../data/data.json';

export const KanbanStore = create((set) => ({
  boards: data.boards,
  selectedBoard: data.boards[0],
  setSelectedBoard: (board) => set({ selectedBoard: board }), 
  addNewBoard: (newBoard) => set((state) => ({ boards: [...state.boards, newBoard], selectedBoard:newBoard })),
  updateBoard: (updatedBoard, updatedData) =>
  set((state) => {
    const updatedBoards = state.boards.map((board) =>
      board === updatedBoard ? { ...board, ...updatedData } : board
    );
    return { boards: updatedBoards };
  }),
  deleteBoard: () => set((state) => {
    const updatedBoards = state.boards.filter(board => board !== state.selectedBoard);
    return {
      boards: updatedBoards,
      selectedBoard: updatedBoards[0] || null,
    };
  }),
  addNewTask: (newTask) => set((state) => {
    const { selectedBoard } = state;
    const { status } = newTask;

    if (!selectedBoard) return state;

    const updatedBoard = { ...selectedBoard };
    const updatedColumns = [...updatedBoard.columns];
    const targetColumn = updatedColumns.find((column) => column.name === status);

    if (!targetColumn) {
      console.error(`No se encontró la columna con el estado ${status}`);
      return state;
    }

    targetColumn.tasks.push(newTask);

    const updatedBoards = state.boards.map((board) =>
      board === state.selectedBoard ? updatedBoard : board
    );

    return { boards: updatedBoards, selectedBoard: updatedBoard };
  }),
  updateColumn: (newTask, targetColumn) => set((state) => {
    const { selectedBoard } = state;

    if (!selectedBoard) return state;

    const updatedBoard = { ...selectedBoard };
    const updatedColumns = updatedBoard.columns.map(column => ({
        ...column,
        tasks: column.tasks.filter(task => task !== newTask) 
    }));

    const targetColumnIndex = updatedColumns.findIndex(column => column.name === targetColumn);

    if (targetColumnIndex === -1) {
        console.error(`No se encontró la columna con el nombre ${targetColumn}`);
        return state;
    }

    updatedColumns[targetColumnIndex].tasks.push(newTask);

    updatedBoard.columns = updatedColumns;

    const updatedBoards = state.boards.map((board) =>
        board === state.selectedBoard ? updatedBoard : board
    );

    return { boards: updatedBoards, selectedBoard: updatedBoard };
}),


  deleteTask: (taskToDelete) => set((state) => {
    const { selectedBoard } = state;
    const updatedBoard = { ...selectedBoard };
    const updatedColumns = [...updatedBoard.columns];

    const updatedColumnsTasks = updatedColumns.map((column) => {
      const updatedTasks = column.tasks.filter((task) => task !== taskToDelete);
      return { ...column, tasks: updatedTasks };
    });

    updatedBoard.columns = updatedColumnsTasks;

    const updatedBoards = state.boards.map((board) =>
      board === state.selectedBoard ? updatedBoard : board
    );

    return { boards: updatedBoards, selectedBoard: updatedBoard };
  }),
  updateTask: (taskTitle, newData) =>
    set((state) => {
      const { selectedBoard } = state;

      if (!selectedBoard) return state;

      const updatedBoard = { ...selectedBoard };
      const updatedColumns = updatedBoard.columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.title === taskTitle ? { ...task, ...newData } : task
        ),
      }));

      updatedBoard.columns = updatedColumns;

      const updatedBoards = state.boards.map((board) =>
        board === state.selectedBoard ? updatedBoard : board
      );

      return { boards: updatedBoards, selectedBoard: updatedBoard };
    }),

    updateCountSubtasks: (title) =>
    set((state) => {
      const updatedBoards = state.boards.map((board) => {
        const updatedColumns = board.columns.map((column) => {
          const updatedTasks = column.tasks.map((task) => {
            if (task.subtasks) {
              task.subtasks.forEach((subtask) => {
                if (subtask.title === title) {
                  subtask.isCompleted = !subtask.isCompleted;
                }
              });
            }
            return task;
          });
          return { ...column, tasks: updatedTasks };
        });
        return { ...board, columns: updatedColumns };
      });
      return { boards: updatedBoards };
    }),
}));

