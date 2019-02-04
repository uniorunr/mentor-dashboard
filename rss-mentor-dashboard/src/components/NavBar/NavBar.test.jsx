import React from 'react';
import renderer from 'react-test-renderer';
import NavBar from './NavBar';

const handleInput = (mentorInput) => {
  this.setState({
    mentor: mentorInput,
  });
};

it('renders correctly', () => {
  const tree = renderer
    .create(<NavBar handleInput={handleInput} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
