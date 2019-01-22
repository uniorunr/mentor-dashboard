const fs = require('fs');
const xlsx = require('xlsx');

const mentorStudentPairsWB = xlsx.readFile('./data/initial/mentor-students_pairs.xlsx');
// const mentorScoreWB = xlsx.readFile('./data/initial/mentor_score.xlsx');
// const tasksListWB = xlsx.readFile('./data/initial/tasks.xlsx');

const mentorStudentPairs = mentorStudentPairsWB.Sheets['second_name-to_github_account'];

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
  pairs: {
    name: 'A',
    surname: 'B',
    city: 'C',
    count: 'D',
    github: 'E',
  },
};

const getMentor = (sheet, currentRow) => {
  const worker = {
    name: sheet[fieldMapping.pairs.name + currentRow].v,
    surname: sheet[fieldMapping.pairs.surname + currentRow].v,
    city: sheet[fieldMapping.pairs.city + currentRow].v,
    count: sheet[fieldMapping.pairs.count + currentRow].v,
    github: sheet[fieldMapping.pairs.github + currentRow].v,
  };

  return worker;
};

const getMentors = (sheet, max) => {
  let curRow = 2;
  const rows = [];
  while (curRow <= max) {
    rows.push(getMentor(sheet, curRow));
    curRow += 1;
  }

  return rows;
};

const pairs = getMentors(mentorStudentPairs, getNumberOfRows(mentorStudentPairs));
const pairsJSON = JSON.stringify(pairs, 0, 2);

fs.writeFile('./data/final/pairs.json', pairsJSON, 'utf8', () => {
  console.log('Writing is done!');
});
