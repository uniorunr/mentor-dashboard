import React from 'react';
import renderer from 'react-test-renderer';
import * as firebase from 'firebase';
import NavBar from './NavBar';

const onAuthStateChanged = jest.fn();
const signInWithPopup = jest.fn(() => Promise.resolve('result of signInWithRedirect'));

jest.spyOn(firebase, 'initializeApp')
  .mockImplementation(() => ({
    auth: () => ({
      currentUser: {},
      signInWithPopup,
    }),
  }));

jest.spyOn(firebase, 'auth').mockImplementation(() => ({
  onAuthStateChanged,
  currentUser: {
    displayName: 'testDisplayName',
    email: 'test@test.com',
    emailVerified: true,
  },
}));

const handleInput = (mentorInput) => {
  this.setState({
    mentor: mentorInput,
  });
};

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

const mentorDataObj = {
  displayName: 'test',
  photoURL: 'test',
};

it('renders correctly', () => {
  const tree = renderer
    .create(<NavBar
      handleInput={handleInput}
      mentorDataObj={mentorDataObj}
      database={database}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
