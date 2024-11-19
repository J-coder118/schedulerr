import React, { useState, useEffect } from "react";
import M from "materialize-css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Initialize Materialize CSS select element
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }, []);

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "passwordConfirmation":
        setPasswordConfirmation(value);
        break;
      case "userType":
        setUserType(value);
        break;
      default:
        break;
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password,
          userType
        })
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
      }
    } catch (error) {
      setError("Registration failed");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row" id="loginForm">
        <div className="col m6 offset-m3">
          <div className="card-panel">
            <div className="row grey lighten-5">
              <div className="col s12 center">
                <h4 className="blue-text text-darken-1">Register</h4>
                {error && <h4>{error}</h4>}
              </div>
            </div>
            <form method="POST" onSubmit={handleRegister}>
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
                    placeholder="Email"
                    type="email"
                    className="validate"
                    value={email}
                    name="email"
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
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    className="validate"
                    value={passwordConfirmation}
                    name="passwordConfirmation"
                    onChange={handleUserChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <select name="userType" value={userType} onChange={handleUserChange} required>
                    <option value="" disabled>Select User Type</option>
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <button className="btn waves-effect waves-light btn-large blue accent-3 loginButtons" type="submit">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;