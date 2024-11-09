export function checkRepeatedValue(type, value, boards) {
    if(type === 'board'){
        const res = boards.some(board => board.name === value);
        return res;
          
      }
      if (type === 'column' && boards) {
        const res = boards.map(board => board.columns && board.columns.some(column => column.name === value)).some(Boolean);
        return res;
      }
      return false;
}