import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import AuthContext from "../context/AuthContext";

import fbIcon from "../images/fb.png";
import instaIcon from "../images/insta.png";

const Footer = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const [t, i18n] = useTranslation();

  return (
    <footer
      className="text-center text-lg-start text-white mt-5"
      style={{ backgroundColor: "#3e4551" }}
    >
      <div className="container p-4 pb-0">
        <section>
          <div className="row">
            <div className="col-lg-5 col-md-6 mb-4 mb-md-0 me-3">
              <h5 className="text-uppercase text-primary">Automotive</h5>
              <p>{t("footer__p1")}</p>
              <p>{t("footer__p2")}</p>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0 ms-5">
              <h5 className="text-uppercase">{t("footer__nav")}</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link to="/" className="text-white text-decoration-none">
                    {t("header__home")}
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-white text-decoration-none">
                    {t("header__cart")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/request-help"
                    className="text-white text-decoration-none"
                  >
                    {t("header__request")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">
                {t("footer__user")}
              </h5>

              {!user ? (
                <ul className="list-unstyled mb-0">
                  <li>
                    <Link
                      to="/login"
                      className="text-white text-decoration-none"
                    >
                      {t("header__login")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="text-white text-decoration-none"
                    >
                      {t("header__register")}
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="list-unstyled mb-0">
                  <li>
                    <Link
                      to="/customer-history"
                      className="text-white text-decoration-none"
                    >
                      {t("header__history")}
                    </Link>
                  </li>
                  <li>
                    <span
                      onClick={logoutUser}
                      className="text-white text-decoration-none"
                    >
                      {t("header__logout")}
                    </span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </section>
        <hr className="mb-4" />

        <section className="mb-4 text-center">
          <a className="m-1" href="https://www.facebook.com" role="button">
            <img src={fbIcon} alt="FB" className="social__icon" />
          </a>

          <a className="m-2" href="https://www.instagram.com" role="button">
            <img src={instaIcon} alt="FB" className="social__icon" />
          </a>
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2022 Copyright: All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
