import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

const Footer = ({ link, text }) => (
  <footer className="footer">
    <div className="footer-wrapper">
      <p>
        Developed with
        <span className="red-heart" role="img" aria-label="red heart">
          {' '}
          ❤️{' '}
        </span>
        by{' '}
        <a href={link} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      </p>
    </div>
  </footer>
);

Footer.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Footer;
