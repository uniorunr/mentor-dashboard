const getFormatOfTask = (task, tasksArray) => {
  const { status } = tasksArray.filter(currTask => currTask.taskName === task)[0];
  let cellValue = null;
  switch (status) {
    case 'checked':
      cellValue = 'Done';
      break;
    case 'checking':
      cellValue = 'Checking';
      break;
    case 'in progress':
      cellValue = 'In Progress';
      break;
    case 'todo':
      cellValue = 'ToDo';
      break;
    default: cellValue = new TypeError('case not found');
  }
  return cellValue;
};

const cellFormattingTask = (cellValue) => {
  let format = null;
  switch (cellValue) {
    case 'Done':
      format = 'cell-bg-green-task';
      break;
    case 'Checking':
      format = 'cell-bg-pink-task';
      break;
    case 'In Progress':
      format = 'cell-bg-yellow-task';
      break;
    case 'ToDo':
      format = 'cell-bg-grey-task';
      break;
    case 'Checked':
      format = 'cell-bg-red-task';
      break;
    default: format = new TypeError('case not found');
  }
  return format;
};

const getFormatOfCell = (score, task, taskStatuses) => {
  const { status } = taskStatuses.filter(currTask => currTask.taskName === task)[0];
  let cellValue = null;
  switch (status) {
    case 'checked':
      if (score) {
        cellValue = 'Done';
      } else cellValue = 'Checked';
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

const cellFormatting = (cellValue) => {
  let format = null;
  switch (cellValue) {
    case 'Done':
      format = 'cell-bg-green';
      break;
    case 'Checking':
      format = 'cell-bg-pink';
      break;
    case 'In Progress':
      format = 'cell-bg-yellow';
      break;
    case 'ToDo':
      format = 'cell-bg-grey';
      break;
    case 'Checked':
      format = 'cell-bg-red';
      break;
    default: format = new TypeError('case not found');
  }
  return format;
};

export {
  getFormatOfCell, cellFormatting, getFormatOfTask, cellFormattingTask,
};
