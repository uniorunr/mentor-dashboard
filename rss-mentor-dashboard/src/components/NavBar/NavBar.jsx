import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo/Logo';
import UserPicker from './UserPicker/UserPicker';
import './NavBar.css';
import LoginButton from './Login/Login';
import UserInfo from './UserInfo/UserInfo';
import { mentorsList } from '../../utils/parseJSON';

class NavBar extends Component {
  render() {
    const { handleInput, mentorDataObj } = this.props;
    return (
      <div className="navbar-container">
        <nav className="navbar">
          <Logo link="/" brandName="RSS MD" />
          <UserPicker
            placeholder="github account"
            options={mentorsList}
            handleInput={handleInput}
          />
          {mentorDataObj ? (
            <UserInfo
              mentorDataObj={mentorDataObj}
            />
          ) : <LoginButton />}
        </nav>
      </div>
    );
  }
}

NavBar.propTypes = {
  handleInput: PropTypes.func.isRequired,
  mentorDataObj: PropTypes.instanceOf(Object),
};

NavBar.defaultProps = {
  mentorDataObj: {},
};

export default NavBar;
