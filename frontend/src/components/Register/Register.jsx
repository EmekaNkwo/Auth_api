import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/Style.css";
import { FaHome, FaTimes, FaCheck } from "react-icons/fa";
import axios from "axios";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

//endpoint for register in API
const REGISTER_URL = "http://localhost:3500/user/register";

function Register() {
  const userRef = useRef();
  const errRef = useRef();

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
  const [success, setSuccess] = useState(false);

  //To put the focus on the user input when it reloads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  //For Validation for Username using the REGEX
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  // For Validation for Password using the REGEX
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const emailcheck = EMAIL_REGEX.test(email);
    const pwdcheck = PWD_REGEX.test(pwd);

    //Does a second Validation Incase
    if (!emailcheck || !pwdcheck) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ email: email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("Network Error");
      } else if (error.response.status === 409) {
        setErrMsg("Email already exists");
      } else {
        setErrMsg("Registration Failed");
      }
      console.log(error);
      errRef.current.focus();
    }
  };

  return (
    <section className="container-fluid">
      {success ? (
        <div className="alert alert-success">
          <strong>Success!</strong> Account Created Successfully.
          <br />
          <Link className="footer-link" to="../login">
            Login
          </Link>
        </div>
      ) : (
        <>
          <Link to="/">
            <div className="icon-details">
              <FaHome className="icon" />
            </div>
          </Link>

          <p
            ref={errRef}
            className={errMsg ? "alert alert-danger" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <form onSubmit={handleSignUp}>
            <h3>Sign Up</h3>
            <div className="input-area">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address:
                  <span className={validEmail ? "valid" : "hide"}>
                    <FaCheck />
                  </span>
                  <span className={validEmail || !email ? "hide" : "invalid"}>
                    <FaTimes />
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your Email Address"
                  autoComplete="off"
                  ref={userRef}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  required
                />
                <p
                  id="uidnote"
                  className={
                    emailFocus && email && !validEmail
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  Please enter a valid email address
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password:
                  <span className={validPwd ? "valid" : "hide"}>
                    <FaCheck />
                  </span>
                  <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FaTimes />
                  </span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setPwd(e.target.value)}
                  id="password"
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  placeholder="Enter your Password"
                  required
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  8 to 24 characters <br />
                  At least one uppercase letter, one lowercase, a number and a
                  special character <br />
                  Allowed special characters: !@#$%
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password" className="form-label">
                  Confirm Password
                  <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <FaCheck />
                  </span>
                  <span
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  >
                    <FaTimes />
                  </span>
                </label>
                <input
                  type="password"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  aria-invalid={validMatch ? "false" : "true"}
                  id="confirm_password"
                  placeholder="Confirm Password"
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className="form-control"
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  Must match the first password input field
                </p>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  !validEmail || !validPwd || !validMatch ? true : false
                }
              >
                Submit
              </button>
            </div>
            <p className="footer-text">
              Already have an Account?
              <Link className="footer-link" to="../login">
                Login
              </Link>
            </p>
          </form>
        </>
      )}
    </section>
  );
}

export default Register;
