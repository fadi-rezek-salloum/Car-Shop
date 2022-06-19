import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

import axios from "axios"

import {
  faPlus,
  faInfoCircle,
  faUser,
  faLock,
  faEnvelope,
  faPhone,
  faAddressCard
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate } from "react-router-dom";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;

const REGISTER_URL = "http://localhost:8000/api/accounts/register/";

const RegisterPage = () => {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [user, navigate]);

  const errRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");


  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, middleName, lastName, email, phone, address, pwd, matchPwd]);

  const handelSubmit = async (e) => {
    e.preventDefault();

    const val1 = EMAIL_REGEX.test(email);
    const val2 = PWD_REGEX.test(pwd);

    if (!val1 || !val2) {
      setErrMsg("Invalid!");
      return;
    }

    let response = await axios.post(
      REGISTER_URL,
      {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,

        email: email,
        password: pwd,

        phone: phone,
        address: address,
      },
      {
        withCredentials: true,
      }
    )

    if (response.status === 201) {
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setPhone("");
      setAddress("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
      setErrMsg("");

      navigate('/login');

    } else {
      setErrMsg(response);
    }
  };

  return (
    <section className="mt-5">
      <h1 className="text-center">Register A New Account</h1>
      <form className="w-50 mt-5 mx-auto" onSubmit={handelSubmit}>
        <div
          ref={errRef}
          className={errMsg ? "alert alert-danger" : "d-none"}
          aria-live="assertive"
        >
          {errMsg}
        </div>

        <label htmlFor="first_name" className="form-label">
          <FontAwesomeIcon icon={faUser} className="me-2" />
          First Name
        </label>
        <input
          type="text"
          name="first_name"
          id="fist_name"
          placeholder="Enter First Name..."
          className="form-control"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          required
        />
        <br />

        <label htmlFor="middle_name" className="form-label">
          <FontAwesomeIcon icon={faUser} className="me-2" />
          Middle Name
        </label>
        <input
          type="text"
          name="middle_name"
          id="middle_name"
          placeholder="Enter Middle Name..."
          className="form-control"
          onChange={(e) => setMiddleName(e.target.value)}
          value={middleName}
        />
        <br />

        <label htmlFor="last_name" className="form-label">
          <FontAwesomeIcon icon={faUser} className="me-2" />
          Last Name
        </label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          placeholder="Enter Last Name..."
          className="form-control"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          required
        />
        <br />

        <label htmlFor="email" className="form-label">
          <FontAwesomeIcon icon={faEnvelope} className="me-2" />
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email..."
          className={
            validEmail
              ? "form-control form__input-valid"
              : "form-control form__input-invalid"
          }
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          aria-invalid={validEmail ? "false" : "true"}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <br />

        <label htmlFor="phone" className="form-label">
          <FontAwesomeIcon icon={faPhone} className="me-2" />
          Phone Number
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="Enter Phone..."
          className="form-control"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          required
        />
        <br />

        <label htmlFor="address" className="form-label">
          <FontAwesomeIcon icon={faAddressCard} className="me-2" />
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Enter Address..."
          className="form-control"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          required
        />
        <br />

        <label htmlFor="password" className="form-label">
          <FontAwesomeIcon icon={faLock} className="me-2" />
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password..."
          className={
            validPwd
              ? "form-control form__input-valid"
              : "form-control form__input-invalid"
          }
          aria-describedby="pwdnote"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <div
          id="pwdnote"
          className={pwdFocus && pwd && !validPwd ? "form-text" : "d-none"}
        >
          <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
          8 to 24 characters. Must include uppercase and lowercase letters, a
          number and a special character. <br />
          <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </div>
        <br />

        <label htmlFor="confirm_pwd" className="form-label">
          <FontAwesomeIcon icon={faLock} className="me-2" />
          Confirm Password
        </label>
        <input
          type="password"
          name="confirm_pwd"
          id="confirm_pwd"
          aria-describedby="confirmnote"
          placeholder="Confirm Password..."
          className={
            validMatch
              ? "form-control form__input-valid"
              : "form-control form__input-invalid"
          }
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <div
          id="confirmnote"
          className={matchFocus && !validMatch ? "form-text" : "d-none"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </div>
        <br />

        <button
          disabled={
            !validEmail ||
            !validPwd ||
            !validMatch
              ? true
              : false
          }
          className="btn btn-primary mb-5 w-100"
          type="submit"
        >
          <FontAwesomeIcon icon={faPlus} className="mx-2" />
          Register New Account
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
