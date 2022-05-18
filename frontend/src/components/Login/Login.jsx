import React, { useEffect, useState, useRef, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "../Styles/Style.css";

const LOGIN_URL = "/api/user/login";

function Login() {
  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMesg, setErrorMesg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrorMesg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || pwd === "") {
      setErrorMesg("Please fill in all fields");
    }

    // if (email === "admin@example.com" && pwd === "admin") {
    //   setSuccess(true);
    // }
    // return setErrorMesg("Invalid username or password");

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify(
          { email, pwd },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data.accessToken;
      const roles = response?.data?.roles;
      setAuth(email, pwd, accessToken, roles);
      setEmail("");
      setPwd("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrorMesg("Network Error");
      } else if (error.response?.status === 400) {
        setErrorMesg("Invalid username or password");
      } else if (error.response?.status === 401) {
        setErrorMesg("Unathorized");
      } else {
        setErrorMesg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const logout = () => {
    setEmail("");
    setPwd("");
    setSuccess(false);
  };

  return (
    <>
      <section className="container-fluid">
        {success ? (
          <div className="alert alert-success">
            <strong>Success!</strong> You have logged in successfully.
            <br />
            <button
              type="submit"
              className="btn mt-3 btn-primary"
              onClick={logout}
            >
              LogOut
            </button>
          </div>
        ) : (
          <>
            <Link to="/">
              <div className="icon-details">
                <FaHome className="icon" />
              </div>
            </Link>
            <strong
              ref={errRef}
              aria-live="assertive"
              className={errorMesg ? "alert alert-danger" : "offscreen"}
            >
              {errorMesg}
            </strong>{" "}
            <form onSubmit={handleSubmit}>
              <h3>Sign In</h3>
              <div className="input-area">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    ref={userRef}
                    autoComplete="off"
                    className="form-control"
                    id="email"
                    placeholder="Enter Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    ref={userRef}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="footer-text">
                Dont have an Account?
                <Link className="footer-link" to="../register">
                  Register
                </Link>
              </p>
            </form>
          </>
        )}
      </section>
    </>
  );
}

export default Login;
