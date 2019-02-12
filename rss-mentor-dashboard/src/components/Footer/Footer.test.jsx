import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './Footer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Footer link="test" text="test" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
