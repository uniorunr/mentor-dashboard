import React from 'react';
import renderer from 'react-test-renderer';
import Table from './Dashboard';

it('renders correctly', () => {
  const tree = renderer
    .create(<Table mentor="alex-zayats" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
