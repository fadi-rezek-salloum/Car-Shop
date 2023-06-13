import React, { useContext } from "react";

import { Link } from "react-router-dom";

import styled from "styled-components";
import AuthContext from "../context/AuthContext";

import WebsiteLogo from "../images/logo.png";
import UserLogo from "../images/user.png";

const Header = (props) => {
  const { user, logoutUser } = useContext(AuthContext);

  const { countCartItems } = props.state;

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <HeaderLogo src={WebsiteLogo} alt="Logo" />
          <span className="navbar__logo-span">AutoMotive</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-primary">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/car/buy" className="nav-link text-primary">
                Buy Car
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/car/rent" className="nav-link text-primary">
                Rent Car
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/request-help" className="nav-link text-primary">
                Request Help
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/cart"
                className="nav-link text-primary position-relative"
              >
                Cart
                <span className="position-absolute top-25 start-100 ms-1 translate-middle badge rounded-pill bg-danger">
                  {countCartItems}
                </span>
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li>
              <Link
                to="/login"
                className={user ? "d-none" : "btn btn-outline-success mx-1"}
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                className={user ? "d-none" : "btn btn-primary mx-1"}
              >
                Register
              </Link>
            </li>

            <li className={!user ? "d-none" : "nav-item dropdown"}>
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={UserLogo}
                  alt="User Logo"
                  className="navbar__user-logo"
                />
              </span>
              <ul
                className="dropdown-menu navbar__user-dropdown"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link to="/customer-history" className="dropdown-item">
                    History
                  </Link>
                </li>
                <li>
                  <button onClick={logoutUser} className="dropdown-item">
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const HeaderLogo = styled.img`
  width: 55px;
  height: 55px;
  margin-right: 15px;
`;

export default Header;
