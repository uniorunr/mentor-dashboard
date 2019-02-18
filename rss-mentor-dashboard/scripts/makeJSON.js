const fs = require('fs');
const xlsx = require('xlsx');

const {
  getNumberOfRows, getMentors, getPairs, mergePairsAndMentors, getTasks,
  mergeTasksAndMainDataObject, getScores, addTaskStatus,
} = require('./functions');

const mentorStudentPairsWB = xlsx.readFile('./data/initial/mentor-students_pairs.xlsx');
const mentorScoreWB = xlsx.readFile('./data/initial/mentor_score.xlsx');
const tasksListWB = xlsx.readFile('./data/initial/tasks.xlsx');

const mentorGithub = mentorStudentPairsWB.Sheets['second_name-to_github_account'];
const studentGithub = mentorStudentPairsWB.Sheets.pairs;
const tasksList = tasksListWB.Sheets.Sheet1;
const mentorScore = mentorScoreWB.Sheets['Form Responses 1'];

const data = getMentors(mentorGithub, getNumberOfRows(mentorGithub));

const pairs = getPairs(studentGithub, getNumberOfRows(studentGithub));

mergePairsAndMentors(pairs, data.mentors);

const tasks = getTasks(tasksList, getNumberOfRows(tasksList));

mergeTasksAndMainDataObject(tasks, data);

const score = getScores(mentorScore, getNumberOfRows(mentorScore));

addTaskStatus(tasks, score, data);

const pairsJSON = JSON.stringify(data, 0, 2);

fs.writeFile('./data/data.json', pairsJSON, 'utf8', () => {
  console.log('Writing is done!'); // eslint-disable-line no-console
});
