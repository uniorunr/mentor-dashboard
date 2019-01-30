import React from 'react';
import Logo from './Logo/Logo';
import UserPicker from './UserPicker/UserPicker';
import './NavBar.css';
import mentorsList from '../../utils/parseJSON';

const NavBar = () => (
  <div className="navbar-container">
    <nav className="navbar">
      <Logo link="/" brandName="RSS MD" />
      <UserPicker placeholder="github account" options={mentorsList} />
    </nav>
  </div>
);

export default NavBar;
