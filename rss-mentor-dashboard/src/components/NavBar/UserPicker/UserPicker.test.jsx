import React from 'react';
import renderer from 'react-test-renderer';
import UserPicker from './UserPicker';

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
