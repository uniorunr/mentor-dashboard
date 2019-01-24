const fs = require('fs');
const xlsx = require('xlsx');

const mentorStudentPairsWB = xlsx.readFile('./data/initial/mentor-students_pairs.xlsx');
// const mentorScoreWB = xlsx.readFile('./data/initial/mentor_score.xlsx');
const tasksListWB = xlsx.readFile('./data/initial/tasks.xlsx');

const mentorGithub = mentorStudentPairsWB.Sheets['second_name-to_github_account'];
const studentGithub = mentorStudentPairsWB.Sheets.pairs;
const tasksList = tasksListWB.Sheets.Sheet1;

const getNumberOfRows = (sheet) => {
  const initial = +sheet['!ref']
    .replace('A1', '')
    .replace(/[^0-9.]{1,10}/, '');
  let finalMax = initial;
  while (!sheet[`A${finalMax}`]) {
    finalMax -= 1;
  }
  return finalMax;
};

const fieldMapping = {
  mentorGithub: {
    name: 'A',
    surname: 'B',
    city: 'C',
    count: 'D',
    github: 'E',
  },
  pairs: {
    interviewer: 'A',
    student: 'B',
  },
  tasks: {
    taskName: 'A',
    link: 'B',
    status: 'C',
  },
};

const getMentor = (sheet, currentRow) => {
  const name = sheet[fieldMapping.mentorGithub.name + currentRow].v;
  const surname = sheet[fieldMapping.mentorGithub.surname + currentRow].v;
  const github = sheet[fieldMapping.mentorGithub.github + currentRow].v;

  const mentor = {
    name,
    surname,
    fullName: `${name.trim().toLowerCase()} ${surname.trim().toLowerCase()}`,
    city: sheet[fieldMapping.mentorGithub.city + currentRow].v,
    count: sheet[fieldMapping.mentorGithub.count + currentRow].v,
    github,
    githubUsername: github.replace(/^.*:\/\/.*\//, '').replace('/', '').toLowerCase(),
    students: [],
  };

  return mentor;
};

const getMentors = (sheet, max) => {
  let curRow = 2;
  const rows = { mentors: [] };
  while (curRow <= max) {
    rows.mentors.push(getMentor(sheet, curRow));
    curRow += 1;
  }

  return rows;
};

const data = getMentors(mentorGithub, getNumberOfRows(mentorGithub));

const getPair = (sheet, currentRow) => {
  const pair = {
    interviewer: sheet[fieldMapping.pairs.interviewer + currentRow].v.trim().toLowerCase(),
    student: sheet[fieldMapping.pairs.student + currentRow].v,
  };

  return pair;
};

const getPairs = (sheet, max) => {
  let curRow = 2;
  const rows = [];
  while (curRow <= max) {
    rows.push(getPair(sheet, curRow));
    curRow += 1;
  }

  return rows;
};

const pairs = getPairs(studentGithub, getNumberOfRows(studentGithub));

pairs.forEach((pair) => {
  const mentor = data.mentors.find(mntr => mntr.fullName === pair.interviewer);

  if (!mentor) return;

  mentor.students.push({ github: String(pair.student).trim().toLowerCase(), tasks: [] });
});

const getTask = (sheet, currentRow) => {
  const link = sheet[fieldMapping.tasks.link + currentRow];
  const task = {
    taskName: sheet[fieldMapping.tasks.taskName + currentRow].v
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s:]|\s+/gm, ''),
    link: link ? link.v : 'no link',
    status: sheet[fieldMapping.tasks.status + currentRow].v.trim().toLowerCase(),
  };

  return task;
};

const getTasks = (sheet, max) => {
  let curRow = 2;
  const rows = [];
  while (curRow <= max) {
    rows.push(getTask(sheet, curRow));
    curRow += 1;
  }

  return rows;
};

const tasks = getTasks(tasksList, getNumberOfRows(tasksList));

data.tasks = [];
const taskTemplate = [];

tasks.forEach((task) => {
  data.tasks.push(task);
  taskTemplate.push({ taskName: task.taskName, status: null });
});

data.mentors.forEach((mentor) => {
  mentor.students.forEach((student) => {
    student.tasks.push(...taskTemplate);
  });
});

const pairsJSON = JSON.stringify(data, 0, 2);

fs.writeFile('./data/data.json', pairsJSON, 'utf8', () => {
  console.log('Writing is done!'); // eslint-disable-line no-console
});
