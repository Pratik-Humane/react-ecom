import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './style.scss';
import Logo from '../../assets/logo.png'
import { auth } from '../../firebase/util';

function Header(props) {
  const { currentUser } = props;
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="React Ecom" />
          </Link>
        </div>
        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">My Account</Link>
              </li>
              <li style={{cursor:'pointer',textTransform:'uppercase'}}>
                <span onClick={()=> auth.signOut()}>LogOut</span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
          
        </div>
      </div>
    </header>
  )
}

Header.defaultProps = {
  currentUser: null
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps, null)(Header);
