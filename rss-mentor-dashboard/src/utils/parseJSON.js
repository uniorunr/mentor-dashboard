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

const studentsList = [];

data.mentors[1].students.forEach((element) => {
  studentsList.push(element.github);
});

const tasksList = [];

data.tasks.forEach((element) => {
  tasksList.push(element.taskName);
});

const dataForDashboard = [];

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

  return finalData;
};

const test = getDataByMentor('alex-zayats', data);

data.mentors[1].students.forEach((element) => {
  dataForDashboard.push(element.github);
});

export {
  mentorsList, studentsList, tasksList, test,
};
