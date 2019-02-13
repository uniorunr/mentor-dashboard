import {
  mentorGithub, getNumberOfRows, getMentors, getPairs, studentGithub,
  getTasks, tasksList, getScores, mentorScore, mergePairsAndMentors,
  mergeTasksAndMainDataObject, addTaskStatus,
} from './makeJSON';

describe('tests for getMentors function', () => {
  const { mentors } = getMentors(mentorGithub, getNumberOfRows(mentorGithub));

  test('should create object with "mentors" property', () => {
    expect(mentors).toBeDefined();
  });

  test('should check if "mentors" property have correct structure and property types', () => {
    expect(mentors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fullName: expect.any(String),
          city: expect.any(String),
          githubUsername: expect.any(String),
          count: expect.any(Number),
          students: expect.arrayContaining([]),
        }),
      ]),
    );
  });
});

describe('tests for getPairs function', () => {
  const pairs = getPairs(studentGithub, getNumberOfRows(studentGithub));

  test('should create array of objects with pairs', () => {
    expect(pairs).toBeDefined();
  });

  test('should check if objects with pairs have correct structure and property types', () => {
    expect(pairs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          interviewer: expect.any(String),
          student: expect.any(String),
        }),
      ]),
    );
  });
});

describe('tests for getTasks function', () => {
  const tasks = getTasks(tasksList, getNumberOfRows(tasksList));

  test('should create array of objects with tasks', () => {
    expect(tasks).toBeDefined();
  });

  test('should check if objects with tasks have correct structure and property types', () => {
    expect(tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          taskName: expect.any(String),
          status: expect.any(String),
        }),
      ]),
    );
  });
});

describe('tests for getScores function', () => {
  const score = getScores(mentorScore, getNumberOfRows(mentorScore));

  test('should create array of objects with scores', () => {
    expect(score).toBeDefined();
  });

  test('should check if objects with scores have correct structure and property types', () => {
    expect(score).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          task: expect.any(String),
          mentor: expect.any(String),
          student: expect.any(String),
        }),
      ]),
    );
  });
});

describe('tests for mergePairsAndMentors function', () => {
  const pairs = getPairs(studentGithub, getNumberOfRows(studentGithub));
  const data = getMentors(mentorGithub, getNumberOfRows(mentorGithub));
  mergePairsAndMentors(pairs, data.mentors);

  test('should merge pairs array and mentors array', () => {
    expect(data).toBeDefined();
  });

  test('should check if final objects have correct structure and property types', () => {
    expect(data).toEqual(expect.objectContaining({
      mentors: expect.arrayContaining([
        expect.objectContaining({
          fullName: expect.any(String),
          city: expect.any(String),
          githubUsername: expect.any(String),
          count: expect.any(Number),
          students: expect.arrayContaining([
            expect.objectContaining({
              github: expect.any(String),
              tasks: expect.arrayContaining([]),
            }),
          ]),
        }),
      ]),
      tasks: expect.arrayContaining([]),
    }));
  });
});

describe('tests for mergeTasksAndMainDataObject function', () => {
  const data = getMentors(mentorGithub, getNumberOfRows(mentorGithub));
  const pairs = getPairs(studentGithub, getNumberOfRows(studentGithub));
  mergePairsAndMentors(pairs, data.mentors);
  const tasks = getTasks(tasksList, getNumberOfRows(tasksList));
  mergeTasksAndMainDataObject(tasks, data);

  test('should merge tasks array and final data object', () => {
    expect(data).toBeDefined();
  });

  test('should check if final objects have correct structure and property types', () => {
    expect(data).toEqual(expect.objectContaining({
      mentors: expect.arrayContaining([
        expect.objectContaining({
          fullName: expect.any(String),
          city: expect.any(String),
          githubUsername: expect.any(String),
          count: expect.any(Number),
          students: expect.arrayContaining([
            expect.objectContaining({
              github: expect.any(String),
              tasks: expect.arrayContaining([
                expect.objectContaining({
                  taskName: expect.any(String),
                  status: null,
                }),
              ]),
            }),
          ]),
        }),
      ]),
      tasks: expect.arrayContaining([
        expect.objectContaining({
          taskName: expect.any(String),
          status: expect.any(String),
        }),
      ]),
    }));
  });
});

describe('tests for addTaskStatus function', () => {
  const data = getMentors(mentorGithub, getNumberOfRows(mentorGithub));
  const pairs = getPairs(studentGithub, getNumberOfRows(studentGithub));
  mergePairsAndMentors(pairs, data.mentors);
  const tasks = getTasks(tasksList, getNumberOfRows(tasksList));
  mergeTasksAndMainDataObject(tasks, data);
  const score = getScores(mentorScore, getNumberOfRows(mentorScore));
  addTaskStatus(tasks, score, data);

  test('should merge tasks status and final data object', () => {
    expect(data).toBeDefined();
  });

  test('should check if final objects have correct structure and property types', () => {
    expect(data).toEqual(expect.objectContaining({
      mentors: expect.arrayContaining([
        expect.objectContaining({
          fullName: expect.any(String),
          city: expect.any(String),
          githubUsername: expect.any(String),
          count: expect.any(Number),
          students: expect.arrayContaining([
            expect.objectContaining({
              github: expect.any(String),
              tasks: expect.arrayContaining([
                expect.objectContaining({
                  taskName: expect.any(String),
                  status: 'checked',
                }),
              ]),
            }),
          ]),
        }),
      ]),
      tasks: expect.arrayContaining([
        expect.objectContaining({
          taskName: expect.any(String),
          status: expect.any(String),
        }),
      ]),
    }));
  });
});
