import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { withRouter } from "react-router";
import { loginProcess } from '../../app/redux/reducer';
import '../../assets/sass/Auth.scss';
import { URL_SERVICE } from '../../utils/constant';
import { setStore } from '../../utils/helper';

const Login = () => {
  const [typePassword, setTypePassword] = useState('password');
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const visiblePasswordChange = () => {
    if (typePassword === 'password') {
      setTypePassword('text');
    } else {
      setTypePassword('password');
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)
    try {
      const res = await axios.post(`${URL_SERVICE}login`, {
        credential: credential,
        password: password
      });
      const token = res.data.data.token;
      const data = res.data.data.user_data;
      const role = res.data.data.role;
      const permissions = res.data.data.permissions;
      const branch = res.data.data.branch !== null ? res.data.data.branch.branch : null;
      let branchId;
      if (res.data.data.branch !== null) {
        branchId = branch.id;
      } else {
        branchId = null;
      }
      const isSuperAdmin = res.data.data.user_data.is_superadmin;
      console.log(isSuperAdmin);
      dispatch(loginProcess(data, role, permissions, isSuperAdmin, branch));
      setStore('web-token', token);
      if (!isSuperAdmin) {
        setStore('branch-selected', branchId);
      }
      setSubmitted(false)
      window.location.reload();
    } catch (err) {
      console.log(err);
      setError(err.response.data.message)
      setSubmitted(false)
    }

  }

  return (
    <Fragment>
      <div className="vh-100 w-100 row m-0">
        <div className="col-lg-7 align-items-center p-5">
          <div className="title-wrap mb-5">
            <h3 className="title-welcome">Selamat Datang</h3>
            <h4 className="subtitle-welcome">Kelola Staf Anda Dengan Mudah</h4>
          </div>
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/login_bg_left.png`}
              alt=""
              width="350"
            />
          </div>
        </div>
        <div className="d-flex col-lg-5 align-items-center auth-bg p-lg-5 bg-blue-rounded text-white">
          <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
            <h3 className="login-title">Silakan Login</h3>

            <form onSubmit={handleFormSubmit}>
              <div>
                <span
                  className="text-center"
                  style={{
                    color: "red",
                  }}
                >
                  {error}
                </span>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="inputEmail" className="label-input">
                  Email
                </label>
                <input
                  id="inputEmail"
                  type="email"
                  placeholder="Email address"
                  className="form-control px-4 input-form"
                  value={credential}
                  onChange={(event) => setCredential(event.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="inputPassword" className="label-input">
                  Password
                </label>
                <input
                  id="inputPassword"
                  type={typePassword}
                  placeholder="Password"
                  className="form-control px-4 input-form"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <span className="p-viewer2">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/${
                      typePassword === "password" ? "Hide.png" : "view.png"
                    }`}
                    alt="eys"
                    onClick={visiblePasswordChange}
                  />
                </span>
              </div>
              <div className="text-right d-flex justify-content-end mt-4">
                <p className="forgot-text">
                  Forgot
                  <a
                    href="https://bootstrapious.com/snippets"
                    className="password-text"
                  >
                    {" "}
                    Password?
                  </a>
                </p>
              </div>
              <div
                className="d-flex justify-content-end"
                style={{ marginRight: "0px" }}
              >
                <button type="submit" className="btn-login">
                  {submitted ? "Loading..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Login);