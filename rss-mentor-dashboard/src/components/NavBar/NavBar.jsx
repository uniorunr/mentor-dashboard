import React from 'react';
import NavBarItem from './NavBarItems/NavBarItem';
import './NavBar.css';

const NavBar = () => (
  <div className="navbar-container">
    <div className="header-logo">
      <h1>Director</h1>
    </div>
    <nav>
      <ul>
        <NavBarItem link="/" name="Home" />
        <NavBarItem link="/about" name="About" />
        <NavBarItem link="/users" name="Users" />
      </ul>
    </nav>
  </div>
);

export default NavBar;
