import React from 'react';
import renderer from 'react-test-renderer';
import * as firebase from 'firebase';
import UserPicker from './UserPicker';

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

it('renders correctly', () => {
  const tree = renderer
    .create(<UserPicker
      placeholder="github account"
      options={[{ value: 'value', label: 'label' }]}
      handleInput={handleInput}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
