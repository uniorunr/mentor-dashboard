import React from 'react';
import renderer from 'react-test-renderer';
import NavBarItem from './NavBarItem';

it('renders correctly', () => {
  const tree = renderer
    .create(<NavBarItem link="/" name="Home" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
