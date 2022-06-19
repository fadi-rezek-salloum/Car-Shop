import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

import { useLocation } from "react-router-dom";

import { faUser, faLock, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginPage = (props) => {
  let { loginUser } = useContext(AuthContext);

  let { state } = useLocation()
  let { referer } = state || ''

  return (
    <section className="mt-5">
      <h1 className="text-center">Login</h1>
      <form className="w-50 mt-5 mx-auto" onSubmit={loginUser}>
        <label htmlFor="email" className="form-label">
          <FontAwesomeIcon icon={faUser} className="me-2" />
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email..."
          className="form-control"
          required
        />
        <br />

        <input type="hidden" name="referer" id="referer" value={referer} />

        <label htmlFor="password" className="form-label">
          <FontAwesomeIcon icon={faLock} className="me-2" />
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password..."
          className="form-control"
          required
        />
        <br />

        <button type="submit" className="btn btn-primary w-100">
          <FontAwesomeIcon icon={faSignIn} className="mx-2" />
          Login
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
