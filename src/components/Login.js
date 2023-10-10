import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

const Login = () => {
  let [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    response = await response.json();
    if (response.success === "true") {
      localStorage.setItem("token", response.authtoken);
      navigate('/')
      // console.log(localStorage.getItem('token'))
    } else {
      alert("Username is not valid");
    }
  };
  return (
    <>
      <div className="container my-5">
        <h2 className="mb-3 text-center">Login to your iNotebook Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={handleChange}
              value={credentials.email}
              name="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={handleChange}
              value={credentials.password}
              name="password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
