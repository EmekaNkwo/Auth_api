import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="display">
        <Link className="link-btn" to="/login">
          Login
        </Link>
        <Link className="link-btn" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;
