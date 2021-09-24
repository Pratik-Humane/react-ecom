import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import Logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "../../redux/User/user.actions";

function Header(props) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSignout = () => {
    dispatch(signOutUserStart());
  };
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
              <li style={{ cursor: "pointer", textTransform: "uppercase" }}>
                <span onClick={handleSignout}>LogOut</span>
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
  );
}

Header.defaultProps = {
  currentUser: null,
};

export default Header;
