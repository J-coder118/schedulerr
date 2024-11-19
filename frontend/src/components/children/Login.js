import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful");
        window.location.href = data.redirectUrl; 
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (error) {
      setError("Login failed");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row" id="loginForm">
        <div className="col m6 offset-m3 s12">
          <div className="card-panel">
            <div className="row grey lighten-5">
              <div className="col s12 center">
                <h4 className="blue-text text-darken-1">
                  <img id="logo" src="/assets/images/logo.png" alt="Logo" />
                  <span className="hide-on-med-and-down">Schedulr</span>
                </h4>
              </div>
            </div>
            <form method="POST" onSubmit={handleLogin}>
              <div className="row">
                <div className="col s12">
                  <input
                    placeholder="Username"
                    type="text"
                    className="validate"
                    value={username}
                    name="username"
                    onChange={handleUserChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <input
                    placeholder="Password"
                    type="password"
                    className="validate"
                    value={password}
                    name="password"
                    onChange={handleUserChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <button className="btn waves-effect waves-light btn-large blue accent-3 loginButtons" type="submit" value="Submit" name="action">
                    Login<i className="material-icons right">send</i>
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <h6>Or login with</h6>
                </div>
              </div>
              <div className="row">
                <div className="col s6">
                  <a id="google" className="btn waves-effect waves-light btn-large loginButtons" href="/auth/google">
                    <i className="fa fa-google"></i>
                  </a>
                </div>
                <div className="col s6">
                  <a id="linkedin" className="btn waves-effect waves-light btn-large loginButtons" href="/auth/linkedin">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </div>
              </div>
              <div className="divider"></div>
              <div className="row">
                <div className="col s12">
                  <h6 id="noAccount">Don't have an account?</h6>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <a className="btn waves-effect waves-light btn-large green accent-3 loginButtons" href="/register">
                    Register<i className="material-icons right">person_add</i>
                  </a>
                </div>
              </div>
              {error && <div className="error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;