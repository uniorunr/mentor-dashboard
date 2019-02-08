import React from 'react';
import renderer from 'react-test-renderer';
import UserInfo from './UserInfo';

const mentorDataObj = {
  displayName: 'test',
  photoURL: 'test',
};

it('renders correctly', () => {
  const tree = renderer
    .create(<UserInfo
      mentorDataObj={mentorDataObj}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
