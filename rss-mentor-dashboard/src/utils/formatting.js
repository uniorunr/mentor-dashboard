const getFormatOfCell = (score, task, taskStatuses) => {
  const { status } = taskStatuses.filter(currTask => currTask.taskName === task)[0];
  let cellValue = null;
  switch (status) {
    case 'checked':
      if (score) {
        cellValue = 'Done';
      } else cellValue = 'No Solution';
      break;
    case 'checking':
      if (score) {
        cellValue = 'Done';
      } else cellValue = 'Checking';
      break;
    case 'in progress':
      if (score) {
        cellValue = 'Done';
      } else cellValue = 'In Progress';
      break;
    case 'todo':
      cellValue = 'ToDo';
      break;
    default: cellValue = new TypeError('case not found');
  }
  return cellValue;
};

export default getFormatOfCell;
