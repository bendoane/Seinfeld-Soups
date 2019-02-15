import React from "react";
import PropTypes from "prop-types";

const Login = props => (
  <nav className="login">
    <h2>Kitchen Login</h2>
    <p>Clock in to manage the kitchen's soup inventory</p>
    <button className="github" onClick={() => props.authenticate("Github")}>
      Clock in with Github
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;
