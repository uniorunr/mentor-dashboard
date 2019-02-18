import React from 'react';
import renderer from 'react-test-renderer';
import SimpleTable from './Dashboard';

const database = {
  mentors: [{
    name: 'Test',
    surname: 'Test',
    fullName: 'Test',
    city: 'Test',
    count: 0,
    github: 'https://github.com/test',
    githubUsername: 'test',
    students: [{
      github: 'test',
      tasks: [{
        taskName: 'Test',
        normalizedTaskName: 'task',
        status: 'checked',
      },
      ],
    }],
  }],
  tasks: [{
    taskName: 'Test',
    normalizedTaskName: 'task',
    link: 'https://github.com/test',
    status: 'checked',
  }],
};

it('renders correctly', () => {
  const tree = renderer
    .create(<SimpleTable mentor="test" database={database} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
