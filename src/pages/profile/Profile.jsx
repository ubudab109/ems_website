import { faCancel, faPencil, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { pictureUpdate } from '../../app/redux/reducer';
import http from '../../service/PrivateConfigRequest';

const Profile = () => {

  const profile = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const inputFile = useRef(null);
  const [formPassword, setFormPassword] = useState(false);
  const [passwordChange, setPasswordChange] = useState({
    current_password: 'password',
    password: '',
    password_confirmation: '',
  });

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };


  const onChangePassword = (e) => {
    setPasswordChange({
      ...passwordChange,
      [e.target.name]: e.target.value,
    });
  }

  const onChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordChange.password !== passwordChange.password_confirmation) {
      swal('New Password Not Match', {
        icon: 'error'
      });
    }
    else if (passwordChange.current_password === '') {
      swal('Please Fill Current Password', {
        icon: 'error'
      });
    } else if (passwordChange.password === '') {
      swal('Please Fill New Password Password', {
        icon: 'error'
      });
    } else {
      http.put('/profile/password', passwordChange)
      .then((res) => {
        swal(res.data.message, {
          icon: 'success',
        }).then(() => {
          setPasswordChange({
            current_password: '',
            password: '',
            password_confirmation: ''
          });
        });
      }).catch((err) => {
        if (err.response.status === 422) {
          swal(err.response.data.data, {
            icon : 'error'
          });
        } else {
          swal("There's Something Wrong. Please Try Again", {
            icon: 'error'
          });
        }
      });
    }
  }

  const onFileUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profile_picture', e.target.files[0]);
    http.post('/profile/picture', formData)
      .then((res) => {
        swal(res.data.message, {
          icon: 'success',
        }).then(() => {
          dispatch(pictureUpdate(res.data.data));
        })
      }).catch((err) => {
        if (err.response.status === 422) {
          swal(err.response.data.data.profile_picture[0], {
            icon: 'error'
          });
        } else {
          swal("There's Something Wrong Please Try Again", {
            icon: 'error'
          });
        }
      });
  }


  return (
    <Fragment>
      <h1 className="mt-4 breadcumb">My Profile</h1>
      <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
        <div className="card card-shadow">
          <span className="mt-4 breadcumb pl-40" style={{
            fontSize: '24px'
          }}>My Profile</span>
          <div className="card-body">
            <div className="row justify-content-start pl-40">
              <div className="col-xl-4 col-lg-6 col-md-5 col-sm-6 profile-picture"
                style={{
                  marginRight: '24px'
                }}
              >
                <img src={profile.dataUser.avatar} alt="avatar" width={150} className="img-circle" />
              </div>
              <div className="col-xl-4 col-lg-3 col-md-4 col-sm-2 img-upload-profile-transform">
                <div className="col">
                  <button className="btn-blue" style={{ border: 'none', width: '102px' }} onClick={() => onButtonClick()}>Choose File</button>
                </div>
                <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 text-muted-span my-1 text-muted-span my-1">
                  Click choose file to change photo
                </div>
                <input type="file" name="" id="file" style={{ display: 'none' }} ref={inputFile} onChange={onFileUpload} />
              </div>
            </div>

            <div className="row justify-content-start my-5 pl-40">
              <h1 className="text-black-purple-bold font-size-24 mb-4">Account Information</h1>
              <div className="col-12">
                <div className="d-flex justify-content-start mb-4">
                  <div className="col-4 font-size-18">
                    Name
                  </div>
                  <div className="col-6">
                    <input type="text" readOnly value={profile.dataUser.name} id="" className="form-control border-black" />
                  </div>
                </div>
                <div className="d-flex justify-content-start mb-4">
                  <div className="col-4 font-size-18">
                    Role
                  </div>
                  <div className="col-6">
                    <input type="text" readOnly value={profile.dataUser.role} id="" className="form-control border-black" />
                  </div>
                </div>
                <div className="d-flex justify-content-start mb-4">
                  <div className="col-4 font-size-18">
                    ID Number
                  </div>
                  <div className="col-6">
                    <input type="text" readOnly value={profile.dataUser.nip} id="" className="form-control border-black" />
                  </div>
                </div>
                <div className="d-flex justify-content-start">
                  <div className="col-4 font-size-18">
                    Email
                  </div>
                  <div className="col-6">
                    <input type="text" readOnly value={profile.dataUser.email} id="" className="form-control border-black" />
                  </div>
                </div>
              </div>
            </div>


            <div className="row justify-content-start my-5 pl-40">
              <h1 className="text-black-purple-bold font-size-24 mb-4">Change Password</h1>
              <div className="col-12">
                <div className="d-flex justify-content-start mb-4">
                  <div className="col-4 font-size-18">
                    {formPassword ? 'Change Password' : 'Password'}
                  </div>
                  <div className="col-6">
                    <input type="password" disabled={formPassword === false ? true : false} onChange={(e) => onChangePassword(e)} name="current_password" value={passwordChange.current_password} id="" className="form-control border-black" />
                  </div>
                  <div className="col-2 ml-5">
                    <button
                      className="btn-border-radius"
                      style={{
                        width: '34px',
                        height: '38px',
                      }}
                      onClick={() => {
                        if (formPassword === true) {
                          setFormPassword(false);
                          setPasswordChange({
                            current_password: 'password',
                            password: '',
                            password_confirmation: '',
                          });
                        } else {
                          setPasswordChange({
                            current_password: '',
                            password: '',
                            password_confirmation: '',
                          });
                          setFormPassword(true);
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={formPassword ? faX : faPencil} style={{
                        color: '#00617F'
                      }} />
                    </button>
                  </div>
                </div>
                {
                  formPassword ?
                    <Fragment>
                      <div className="d-flex justify-content-start mb-4">
                        <div className="col-4 font-size-18">
                          New Password
                        </div>
                        <div className="col-6">
                          <input type="password" onChange={(e) => onChangePassword(e)} name="password" value={passwordChange.password} className="form-control border-black" />
                        </div>
                      </div>
                      <div className="d-flex justify-content-start">
                        <div className="col-4 font-size-18">
                          Confirm Password
                        </div>
                        <div className="col-6">
                          <input type="password" onChange={(e) => onChangePassword(e)} name="password_confirmation" value={passwordChange.password_confirmation} className="form-control border-black" />
                        </div>
                      </div>
                      <div className="col-12 font-size-18 text-right" style={{
                            paddingRight: '16.5%',
                            paddingTop: '17px',
                      }}>
                        <button className="btn-blue" onClick={(e) => onChangePasswordSubmit(e)}> Save </button>
                      </div>
                    </Fragment> :
                    null
                }
              </div>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
