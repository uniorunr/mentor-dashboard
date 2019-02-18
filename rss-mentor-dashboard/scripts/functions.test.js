import {
  getNumberOfRows,
  getMentors,
  getPairs,
  mergePairsAndMentors,
  getTasks,
  mergeTasksAndMainDataObject,
  getScores,
  addTaskStatus,
} from './functions';

const mockMentorGithub = {
  A1: { v: 'header10' },
  B1: { v: 'header11' },
  C1: { v: 'header12' },
  D1: { v: 'header13' },
  E1: { v: 'header14' },
  A2: { v: 'Aliaksandr' },
  B2: { v: 'Zayats' },
  C2: { v: 'Гомель' },
  D2: { v: 2 },
  E2: { v: 'https://github.com/alex-zayats' },
  '!ref': 'A1:E2',
};

const mockStudentGithub = {
  A1: { v: 'header10' },
  B1: { v: 'header11' },
  A2: { v: 'Aliaksandr Zayats' },
  B2: { v: 'uniorunr' },
  '!ref': 'A1:B2',
};

const mockTasksList = {
  A1: { v: 'header10' },
  C1: { v: 'header11' },
  A2: { v: 'Presentation' },
  C2: { v: 'Checked' },
  '!ref': 'A1:C2',
};

const mockMentorScore = {
  A1: { v: 'header10' },
  B1: { v: 'header11' },
  C1: { v: 'header12' },
  D1: { v: 'header13' },
  A2: { v: 'test' },
  B2: { v: 'https://github.com/alex-zayats' },
  C2: { v: 'https://github.com/uniorunr' },
  D2: { v: 'Presentation' },
  '!ref': 'A1:D2',
};

describe('tests for getMentors function', () => {
  const mockMentors = getMentors(mockMentorGithub, getNumberOfRows(mockMentorGithub));

  test('should create object with "mentors" property', () => {
    expect(mockMentors).toBeDefined();
  });

  test('should check if "mentors" property have correct structure and property types', () => {
    expect(mockMentors.mentors).toEqual(
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

  test('should create mentors array with correct values', () => {
    expect(mockMentors.mentors).toEqual([{
      fullName: 'aliaksandr zayats',
      city: 'Гомель',
      githubUsername: 'alex-zayats',
      count: 2,
      students: [],
    }]);
  });
});

describe('tests for getPairs function', () => {
  const mockPairs = getPairs(mockStudentGithub, getNumberOfRows(mockStudentGithub));

  test('should create array of objects with pairs', () => {
    expect(mockPairs).toBeDefined();
  });

  test('should check if objects with pairs have correct structure and property types', () => {
    expect(mockPairs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          interviewer: expect.any(String),
          student: expect.any(String),
        }),
      ]),
    );
  });

  test('should create pairs array with correct values', () => {
    expect(mockPairs).toEqual([{
      interviewer: 'aliaksandr zayats',
      student: 'uniorunr',
    }]);
  });
});

describe('tests for getTasks function', () => {
  const mockTasks = getTasks(mockTasksList, getNumberOfRows(mockTasksList));

  test('should create array of objects with tasks', () => {
    expect(mockTasks).toBeDefined();
  });

  test('should check if objects with tasks have correct structure and property types', () => {
    expect(mockTasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          taskName: expect.any(String),
          status: expect.any(String),
        }),
      ]),
    );
  });

  test('should create tasks array with correct values', () => {
    expect(mockTasks).toEqual([{
      taskName: 'Presentation',
      status: 'checked',
    }]);
  });
});

describe('tests for getScores function', () => {
  const mockScore = getScores(mockMentorScore, getNumberOfRows(mockMentorScore));

  test('should create array of objects with scores', () => {
    expect(mockScore).toBeDefined();
  });

  test('should check if objects with scores have correct structure and property types', () => {
    expect(mockScore).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          task: expect.any(String),
          mentor: expect.any(String),
          student: expect.any(String),
        }),
      ]),
    );
  });

  test('should create score array with correct values', () => {
    expect(mockScore).toEqual([{
      task: 'presentation',
      mentor: 'alex-zayats',
      student: 'uniorunr',
    }]);
  });
});

describe('tests for mergePairsAndMentors function', () => {
  const mockPairs = getPairs(mockStudentGithub, getNumberOfRows(mockStudentGithub));
  const mockMentors = getMentors(mockMentorGithub, getNumberOfRows(mockMentorGithub));

  mergePairsAndMentors(mockPairs, mockMentors.mentors);

  test('should merge pairs array and mentors array', () => {
    expect(mockMentors).toBeDefined();
  });

  test('should check if final objects have correct structure and property types', () => {
    expect(mockMentors).toEqual(expect.objectContaining({
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

  test('should update main data obj with correct values', () => {
    expect(mockMentors).toEqual({
      mentors: [{
        fullName: 'aliaksandr zayats',
        city: 'Гомель',
        githubUsername: 'alex-zayats',
        count: 2,
        students: [{
          github: 'uniorunr',
          tasks: [],
        }],
      }],
      tasks: [],
    });
  });
});

describe('tests for mergeTasksAndMainDataObject function', () => {
  const mockPairs = getPairs(mockStudentGithub, getNumberOfRows(mockStudentGithub));
  const mockMentors = getMentors(mockMentorGithub, getNumberOfRows(mockMentorGithub));

  mergePairsAndMentors(mockPairs, mockMentors.mentors);

  const mockTasks = getTasks(mockTasksList, getNumberOfRows(mockTasksList));

  mergeTasksAndMainDataObject(mockTasks, mockMentors);

  test('should merge tasks array and final data object', () => {
    expect(mockMentors).toBeDefined();
  });

  test('should check if final objects have correct structure and property types', () => {
    expect(mockMentors).toEqual(expect.objectContaining({
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

  test('should update main data obj with correct values', () => {
    expect(mockMentors).toEqual({
      mentors: [{
        fullName: 'aliaksandr zayats',
        city: 'Гомель',
        githubUsername: 'alex-zayats',
        count: 2,
        students: [{
          github: 'uniorunr',
          tasks: [{
            taskName: 'Presentation',
            status: null,
          }],
        }],
      }],
      tasks: [{
        taskName: 'Presentation',
        status: 'checked',
      }],
    });
  });
});

describe('tests for addTaskStatus function', () => {
  const mockPairs = getPairs(mockStudentGithub, getNumberOfRows(mockStudentGithub));
  const mockMentors = getMentors(mockMentorGithub, getNumberOfRows(mockMentorGithub));

  mergePairsAndMentors(mockPairs, mockMentors.mentors);

  const mockTasks = getTasks(mockTasksList, getNumberOfRows(mockTasksList));

  mergeTasksAndMainDataObject(mockTasks, mockMentors);

  const mockScore = getScores(mockMentorScore, getNumberOfRows(mockMentorScore));

  addTaskStatus(mockTasks, mockScore, mockMentors);

  test('should merge tasks status and final data object', () => {
    expect(mockMentors).toBeDefined();
  });

  test('should check if final objects have correct structure and property types', () => {
    expect(mockMentors).toEqual(expect.objectContaining({
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

  test('should update main data obj with correct values', () => {
    expect(mockMentors).toEqual({
      mentors: [{
        fullName: 'aliaksandr zayats',
        city: 'Гомель',
        githubUsername: 'alex-zayats',
        count: 2,
        students: [{
          github: 'uniorunr',
          tasks: [{
            taskName: 'Presentation',
            status: 'checked',
          }],
        }],
      }],
      tasks: [{
        taskName: 'Presentation',
        status: 'checked',
      }],
    });
  });
});
