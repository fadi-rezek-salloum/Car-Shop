import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { faUser, faLock, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginPage = (props) => {
  let { loginUser } = useContext(AuthContext);

  const [t, i18n] = useTranslation();

  let { state } = useLocation();
  let { referer } = state || "";

  return (
    <section className="mt-5">
      <h1 className="text-center">{t("login__title")}</h1>
      <form className="w-50 mt-5 mx-auto" onSubmit={loginUser}>
        <label htmlFor="email" className="form-label">
          <FontAwesomeIcon icon={faUser} className="me-2" />
          {t("register__email")}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder='{t("register__email")}...'
          className="form-control"
          required
        />
        <br />

        <input type="hidden" name="referer" id="referer" value={referer} />

        <label htmlFor="password" className="form-label">
          <FontAwesomeIcon icon={faLock} className="me-2" />
          {t("register__pass1")}
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder='{t("register__pass1")}'
          className="form-control"
          required
        />
        <br />

        <button type="submit" className="btn btn-primary w-100">
          <FontAwesomeIcon icon={faSignIn} className="mx-2" />
          {t("login__title")}
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
