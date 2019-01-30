import React from 'react';
import PropTypes from 'prop-types';
import './Logo.css';

const Logo = ({ link, brandName }) => (
  <h1 className="navbar-logo">
    <a href={link}>{brandName}</a>
  </h1>
);

Logo.propTypes = {
  link: PropTypes.string.isRequired,
  brandName: PropTypes.string.isRequired,
};

export default Logo;
