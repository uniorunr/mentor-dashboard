const getMentorsList = (datObj) => {
  const list = [];

  datObj.mentors.forEach((element) => {
    list.push({ value: element.githubUsername, label: element.githubUsername });
  });

  list.sort((a, b) => {
    const nameA = a.value;
    const nameB = b.value;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

  return list;
};

const getLasksList = (dataObj) => {
  const tasksList = [];

  dataObj.tasks.forEach((element) => {
    tasksList.push({
      taskName: element.taskName,
      status: element.status,
    });
  });

  return tasksList;
};

const getDataByMentor = (mentor, dataObj) => {
  const currMentor = dataObj.mentors.filter(ment => ment.githubUsername === mentor)[0];
  const finalData = [];

  currMentor.students[0].tasks.forEach((task) => {
    finalData.push({ task: task.taskName });
  });

  finalData.forEach((task, i) => {
    currMentor.students.forEach((student) => {
      Object.defineProperty(task, student.github, {
        value: student.tasks[i].status,
        configurable: true,
        enumerable: true,
      });
    });
  });

  const studentsList = [];

  currMentor.students.forEach((element) => {
    studentsList.push(element.github);
  });

  return { finalData, studentsList };
};

export {
  getMentorsList, getLasksList, getDataByMentor,
};
