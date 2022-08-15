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
      dispatch(loginProcess(data, role, permissions));
      setStore('web-token', token);
      setSubmitted(false)
      window.location.reload();
    } catch (err) {
      setError(err.response.data.message)
      setSubmitted(false)
    }

  }

  return (
    <Fragment>
      <div className="container">
        <div className="row no-gutter">
          <div className="col-xl-7 col-lg-12 col-md-12 col-sm-12 d-none d-md-flex">
            <div className="col-xl-12 col-lg-6 col-md-6 col-sm-6 left-bg">
              <div className="title-wrap">
                <h3 className="title-welcome">Selamat Datang</h3>
                <h4 className="subtitle-welcome">Kelola Staf Anda Dengan Mudah</h4>
              </div>
              <div className="p-5 align-items-center">
                <img src={`${process.env.PUBLIC_URL}/assets/img/login_bg_left.png`} alt="" width="450" />
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 bg-blue-rounded">
            <div className="login">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12">
                    <h3 className="login-title">Silahkan Login</h3>
                    <form onSubmit={handleFormSubmit}>
                      <div>
                        <span className="text-center" style={{
                          color: "red",
                        }}>{error}</span>
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="inputEmail" className="label-input">Email</label>
                        <input
                          id="inputEmail"
                          type="email"
                          placeholder="Email address"
                          className="form-control px-4 input-form"
                          value={credential}
                          onChange={event => setCredential(event.target.value)}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="inputPassword" className="label-input">Password</label>
                        <input
                          id="inputPassword"
                          type={typePassword}
                          placeholder="Password"
                          className="form-control px-4 input-form"
                          value={password}
                          onChange={event => setPassword(event.target.value)}
                        />
                        <span className="p-viewer2">
                          <img src={`${process.env.PUBLIC_URL}/assets/img/${typePassword === 'password' ? 'Hide.png' : 'view.png'}`} alt="eys" onClick={visiblePasswordChange} />
                        </span>
                      </div>
                      <div className="text-right d-flex justify-content-end mt-4">
                        <p className="forgot-text">
                          Forgot
                          <a href="https://bootstrapious.com/snippets" className="password-text">
                            {' '}Password?
                          </a>
                        </p>
                      </div>
                      <div className="d-flex justify-content-end" style={{ marginRight: '0px' }}>
                        <button type="submit" className="btn-login">{submitted ? 'Loading...' : 'Login'}</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="company-name text-center">
                  <p>PT. Lorem Ipsum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Login);