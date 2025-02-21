import React, { useState } from "react";
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from "axios";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/employeelogin`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("emp_token", token);
        localStorage.setItem("emp_user", JSON.stringify(user));
        console.log(JSON.stringify(response.data));
        alert("Login successful!");
        setIsAuthenticated(true);
        navigate("/employee-dashboard");
      }
      setError("Incorrect email or password");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Incorrect email or password");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.log(error);
    }
  };

  // Check authentication status and redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/employee-dashboard" />;
  }

  return (
    <div id="mytask-layout">
      {/* main body area */}
      <div className="main p-2 py-3 p-xl-5 ">
        {/* Body: Body */}
        <div className="body d-flex p-0 p-xl-5">
          <div className="container-xxl">
            <div className="row g-0">
              <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center rounded-lg auth-h100">
                <div style={{ maxWidth: "25rem" }}>
                  <img
                    src="../Images/icon.png"
                    className="mb-4"
                    style={{ width: "-webkit-fill-available" }}
                  />
                  <div className="d-flex justify-content-center ">
                    <img
                      src="../Images/crm.jpeg"
                      className="text-center"
                      style={{ height: "30px" }}
                    />
                  </div>
                  {/* Image block */}
                  <div>
                    <img src="../assets/images/login-img.svg" alt="login-img" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
                <div
                  className="w-100 p-3 p-md-5 card border-0 bg-dark text-light"
                  style={{ maxWidth: "32rem" }}
                >
                  {/* Form */}
                  <form onSubmit={handleSubmit} className="row g-1 p-3 p-md-4">
                    <div className="col-12 text-center mb-1 mb-lg-5">
                      <h1>Employee Sign in</h1>
                      <span>Employee Panel</span>
                    </div>
                    <div className="col-12 text-center mb-4">
                      <Link
                        className="btn btn-lg btn-outline-secondary btn-block"
                        to="/"
                      >
                        <span className="d-flex justify-content-center align-items-center gap-2">
                          <i className="bi bi-person-plus-fill"></i>
                          Sign in as an Admin
                        </span>
                      </Link>
                      <span className="dividers text-muted mt-4">OR</span>
                    </div>
                    <div className="col-12">
                      <div className="mb-2">
                        <label className="form-label">Email address</label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          value={formData.email}
                          className="form-control form-control-lg"
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-2">
                        <div className="form-label">
                          <span className="d-flex justify-content-between align-items-center">
                            Password
                            <a
                              className="text-secondary"
                              href="auth-password-reset.html"
                            >
                              Forgot Password?
                            </a>
                          </span>
                        </div>
                        <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          value={formData.password}
                          className="form-control form-control-lg"
                          placeholder="***************"
                        />
                      </div>
                    </div>
                    <div className="col-12 text-center mt-4">
                      <button
                        type="submit"
                        className="btn btn-lg btn-block btn-light lift text-uppercase"
                        atl="signin"
                      >
                        SIGN IN
                      </button>
                    </div>
                    {error && <p className="text-danger mt-3 text-center">{error}</p>}
                  </form>
                  <div className="col-12 text-center mt-4">
                    <span className="text-muted">
                      Don't have an account yet?{" "}
                      <Link to="/employeesignup" className="text-secondary">
                        Sign up here
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
