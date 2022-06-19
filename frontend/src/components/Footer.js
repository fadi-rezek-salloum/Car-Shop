import React from 'react'

import { Link } from 'react-router-dom'

import fbIcon from '../images/fb.png'
import instaIcon from '../images/insta.png'

const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start text-white mt-5" style={{"backgroundColor": "#3e4551"}}>

      <div className="container p-4 pb-0">
        <section>
          <div className="row">
            <div className="col-lg-5 col-md-6 mb-4 mb-md-0 me-3">
              <h5 className="text-uppercase text-primary">Automotive</h5>
              <p>
                For everything about cars!
              </p>
              <p>
                You can rent cars, buy parts, request a fix in your current location. 
              </p>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0 ms-5">
              <h5 className="text-uppercase">Navigation</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link to="/" className="text-white text-decoration-none">Home</Link>
                </li>
                <li>
                  <Link to="/cart" className="text-white text-decoration-none">Cart</Link>
                </li>
                <li>
                  <Link to="/request-help" className="text-white text-decoration-none">Request Help</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">User</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link to="/login" className="text-white text-decoration-none">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="text-white text-decoration-none">Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <hr className="mb-4" />

        <section className="mb-4 text-center">
          <a
            className="m-1"
            href="https://www.facebook.com"
            target='_blank'
            role="button"
            >
                <img src={fbIcon} alt="FB" className="social__icon" />
          </a>

          <a
            className="m-2"
            href="https://www.instagram.com"
            role="button"
            target='_blank'
          >
            <img src={instaIcon} alt="FB" className="social__icon" />
          </a>

        </section>

      </div>

      <div
          className="text-center p-3"
          style={{"backgroundColor": "rgba(0, 0, 0, 0.2)"}}
          >
        © 2022 Copyright: All Rights Reserved
      </div>

    </footer>
  )
}

export default Footer