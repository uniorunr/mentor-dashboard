import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo/Logo';
import UserPicker from './UserPicker/UserPicker';
import './NavBar.css';
import { mentorsList } from '../../utils/parseJSON';

class NavBar extends Component {
  render() {
    const { handleInput } = this.props;
    return (
      <div className="navbar-container">
        <nav className="navbar">
          <Logo link="/" brandName="RSS MD" />
          <UserPicker
            placeholder="github account"
            options={mentorsList}
            handleInput={handleInput}
          />
        </nav>
      </div>
    );
  }
}

NavBar.propTypes = {
  handleInput: PropTypes.func.isRequired,
};

export default NavBar;
