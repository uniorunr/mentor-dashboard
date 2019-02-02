import dataJSON from '../../data/data.json';

const data = JSON.parse(JSON.stringify(dataJSON));

const mentorsList = [];

data.mentors.forEach((element) => {
  mentorsList.push({ value: element.githubUsername, label: element.githubUsername });
});

mentorsList.sort((a, b) => {
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

const tasksList = [];

data.tasks.forEach((element) => {
  tasksList.push({
    taskName: element.taskName,
    status: element.status,
  });
});

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
  mentorsList, tasksList, getDataByMentor, data,
};
