import dataJSON from '../../data/data.json';

const data = JSON.parse(JSON.stringify(dataJSON));

const mentors = [];

data.mentors.forEach((element) => {
  mentors.push({ value: element.githubUsername, label: element.githubUsername });
});

mentors.sort((a, b) => {
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

export default mentors;
