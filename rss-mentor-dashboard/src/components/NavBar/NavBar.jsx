import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Logo from './Logo/Logo';
import UserPicker from './UserPicker/UserPicker';
import './NavBar.css';
import LoginButton from './Login/Login';
import UserInfo from './UserInfo/UserInfo';

class NavBar extends Component {
  render() {
    const { handleInput, mentorDataObj, database } = this.props;
    return (
      <div className="navbar-container">
        <nav className="navbar">
          <Logo link="/" brandName="RSS MD" />
          {database ? (
            <UserPicker
              placeholder="github account"
              handleInput={handleInput}
              database={database}
            />
          ) : (
            <CircularProgress disableShrink />
          )}
          {mentorDataObj ? (
            <UserInfo mentorDataObj={mentorDataObj} />
          ) : (
            <LoginButton />
          )}
        </nav>
      </div>
    );
  }
}

NavBar.propTypes = {
  handleInput: PropTypes.func.isRequired,
  mentorDataObj: PropTypes.instanceOf(Object),
  database: PropTypes.instanceOf(Object),
};

NavBar.defaultProps = {
  mentorDataObj: {},
  database: {},
};

export default NavBar;
