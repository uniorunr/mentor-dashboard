import React from 'react';
import PropTypes from 'prop-types';
import './NavBarItem.css';

const NavBarItem = ({ link, name }) => (
  <li>
    <a href={link}>{name}</a>
  </li>
);

NavBarItem.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default NavBarItem;
