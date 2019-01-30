import React from 'react';
import renderer from 'react-test-renderer';
import UserPicker from './UserPicker';

it('renders correctly', () => {
  const tree = renderer
    .create(<UserPicker
      placeholder="github account"
      options={[{ value: 'value', label: 'label' }]}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
