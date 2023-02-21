import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { logoutProcess } from "../app/redux/reducer";
import { URL_SERVICE } from "../utils/constant";
import { clearAllItem } from "../utils/helper";
import http from "../service/PrivateConfigRequest";
import CustomModal from "../component/CustomModal";
import { useHistory } from "react-router-dom";
import "./layout.scss";

const Navbar = () => {
  /**
   * Navbar Toggle
   */
  const [navbarToggle, setNavbarToggle] = useState({
    button: "navbar-toggler collapsed",
    dropdown: "navbar-collapse collapse",
  });

  /**
   * Navbar Dropdown
   */
  const [dropdownNotif, setDropdownNotif] = useState(false);
  const [dropdownProfile, setDropdownProfile] = useState(false);

  /**
   * Modal Event for Logout
   */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * history
   */
  const history = useHistory();
  /**
   * Dispatch for reducer action
   */
  const dispatch = useDispatch();

  /**
   * Selector to get data from redux
   */
  const data = useSelector((state) => state.auth);

  /**
   * Toggle sidebar on mobile
   */
  const toggleSidebarChange = () => {
    if (document.body.className === "sb-sidenav-toggled") {
      document.body.className = "body";
    } else {
      document.body.className = "sb-sidenav-toggled";
    }
  };

  /**
   * Toggle navbar on mobile
   */
  const toggleNavbarChange = () => {
    if (
      navbarToggle.button === "navbar-toggler collapsed" &&
      navbarToggle.dropdown === "navbar-collapse collapse"
    ) {
      setNavbarToggle({
        button: "navbar-toggler",
        dropdown: "navbar-collapse collapse show",
      });
    } else {
      setNavbarToggle({
        button: "navbar-toggler collapsed",
        dropdown: "navbar-collapse collapse",
      });
    }
  };

  /**
   * Toggle dropdown notif
   * @param {event} event
   */
  const toggleDropdownNotif = (event) => {
    event.stopPropagation();
    if (dropdownProfile === true) {
      setDropdownProfile(false);
    }
    if (dropdownNotif === false) {
      setDropdownNotif(true);
    } else {
      setDropdownNotif(false);
    }
  };

  /**
   * Toggle dropdown profile
   * @param {event} event
   */
  const toggleDropdownProfile = (event) => {
    event.stopPropagation();
    if (dropdownNotif === true) {
      setDropdownNotif(false);
    }
    if (dropdownProfile === false) {
      setDropdownProfile(true);
    } else {
      setDropdownProfile(false);
    }
  };

  /**
   * Logout process
   */
  const logout = () => {
    http
      .post(`${URL_SERVICE}logout`)
      .then((res) => {
        clearAllItem();
        dispatch(logoutProcess());
        window.location.reload();
      })
      .catch((err) => {
        swal(`Opps ${err.response.data.message}`, {
          icon: "error",
        });
      });
  };

  return (
    // {/* <!-- Top navigation--> */}
    // <nav className="navbar navbar-expand-lg" style={{ background: '#F1FCFF' }}>
    //   <div className="container-fluid">

    //     {/* MODAL LOGOUT */}
    //     <CustomModal
    //       show={show}
    //       handleClose={handleClose}
    //       text='Are you sure you want to log out of this account?'
    //       submitText='Sure'
    //       handleSure={logout}
    //     />
    //     {/* END */}


    //     {/* <button className="btn btn-primary" id="sidebarToggle" onClick={toggleSidebarChange}>Menu</button>
    //     <button className={navbarToggle.button} type="button" onClick={toggleNavbarChange} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
    //     <div className={`${navbarToggle.dropdown} text-center`} id="navbarSupportedContent">
    //       <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
    //         <div className="card nav-card">
    //           <div className="card-block">
    //             <div className="row" style={{ marginTop: '9px' }}>
    //               <div className="col-md-6 notif-margin">
    //                 <div className="col" onClick={toggleDropdownNotif}>
    //                   <div className="photo-box" style={{ cursor: 'pointer' }}>
    //                     <img src={`${process.env.PUBLIC_URL}/assets/img/notif.png`} alt="" />
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="col-1 vertical" />
    //               <div className="col-md-3">
    //                 <div className="photo-box">
    //                   <img src={`${process.env.PUBLIC_URL}/assets/img/ecl.png`} style={{ cursor: 'pointer' }} alt="" onClick={toggleDropdownProfile} />
    //                 </div>
    //               </div>
    //               <div className="col-md-2" style={{ paddingTop: '5px', paddingLeft: '7px' }}>
    //                 <div className="col">
    //                   <div className="photo-box" onClick={toggleDropdownProfile}>
    //                     <img src={`${process.env.PUBLIC_URL}/assets/img/arrow_down.png`} alt="" style={{ cursor: 'pointer' }} />
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="row">
    //               <Dropdown.Menu show={dropdownNotif} className="dropdown-menu-notif">
    //                 <Dropdown.Header>Notif</Dropdown.Header>
    //                 <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
    //                 <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
    //               </Dropdown.Menu>
    //               <Dropdown.Menu show={dropdownProfile}>
    //                 <Dropdown.Header style={{ marginTop: '9px' }}>
    //                   <div className="row profile-row-dropdown">
    //                     <div className="col-xl-3 col-lg-3 col-md-6 col-sm-1">
    //                       <img src={`${process.env.PUBLIC_URL}/assets/img/ecl.png`} style={{ cursor: 'pointer' }} alt="" />
    //                     </div>
    //                     <div className="col-xl-3 col-lg-3 col-md-6 col-sm-1">
    //                       <h3 className="profile-name-dropdown">{data.dataUser.name}</h3>
    //                       <h3 className="profile-information-dropdown">{data.role} (default)</h3>
    //                       <h3 className="profile-information-dropdown" style={{ lineHeight: '0px' }}>NIP : {data.dataUser.nip}</h3>
    //                     </div>
    //                   </div>
    //                 </Dropdown.Header>
    //                 <Dropdown.Divider />
    //                 <Dropdown.Item eventKey="2" onClick={() => history.push('/profile')}>
    //                   My Profile
    //                 </Dropdown.Item>
    //                 <Dropdown.Item eventKey="3" onClick={handleShow}>Logout</Dropdown.Item>
    //               </Dropdown.Menu>
    //             </div>
    //           </div>

    //         </div>


    //       </ul>

    //     </div> */}

    //   </div>
    // </nav>
    <div class="container-fluid text-center">
         {/* MODAL LOGOUT */}
        <CustomModal
          show={show}
          handleClose={handleClose}
          text='Are you sure you want to log out of this account?'
          submitText='Sure'
          handleSure={logout}
        />
        {/* END */}
      <div class="row">
        <div class="col-xl-9" />
        <div class="col-xl-3 bg-blue custom-border p-2">
          <div className="row justify-content-end">
            <div className="col-xl-2 notif-margin">
              <div className="col" onClick={toggleDropdownNotif}>
                <div className="photo-box" style={{ cursor: "pointer" }}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/notif1.png`}
                    width={30}
                    height={30}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-5 d-flex">
              <div className="photo-box">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/img/ecl.png`}
                  style={{ cursor: "pointer" }}
                  alt=""
                  onClick={toggleDropdownProfile}
                />
              </div>
              <div className="mx-2 my-2">
                <h3 className="profile-name-dropdown">{data.dataUser.name}</h3>
                <h3 className="profile-information-dropdown">
                  {data.role} (default)
                </h3>
                <h3
                  className="profile-information-dropdown"
                  style={{ lineHeight: "0px" }}
                >
                  NIP : {data.dataUser.nip}
                </h3>
              </div>
            </div>
            <div
              className="col-xl-2"
              style={{ paddingTop: "5px", paddingLeft: "7px" }}
            >
              <div className="col">
                <div className="photo-box" onClick={toggleDropdownProfile}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/arrow_down.png`}
                    alt=""
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <Dropdown.Menu show={dropdownNotif} className="dropdown-menu-notif">
              <Dropdown.Header>Notif</Dropdown.Header>
              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
              <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
            </Dropdown.Menu>
            <Dropdown.Menu show={dropdownProfile}>
              <Dropdown.Header style={{ marginTop: "9px" }}>
                <div className="row profile-row-dropdown">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-1">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/img/ecl.png`}
                      style={{ cursor: "pointer" }}
                      alt=""
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-1">
                    <h3 className="profile-name-dropdown">
                      {data.dataUser.name}
                    </h3>
                    <h3 className="profile-information-dropdown">
                      {data.role} (default)
                    </h3>
                    <h3
                      className="profile-information-dropdown"
                      style={{ lineHeight: "0px" }}
                    >
                      NIP : {data.dataUser.nip}
                    </h3>
                  </div>
                </div>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item
                eventKey="2"
                onClick={() => history.push("/profile")}
              >
                My Profile
              </Dropdown.Item>
              <Dropdown.Item eventKey="3" onClick={handleShow}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </div>
          <div className="row">
                  <Dropdown.Menu show={dropdownNotif} className="dropdown-menu-notif">
                    <Dropdown.Header>Notif</Dropdown.Header>
                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                  </Dropdown.Menu>
                  <Dropdown.Menu show={dropdownProfile}>
                    <Dropdown.Header style={{ marginTop: '9px' }}>
                      <div className="row profile-row-dropdown">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-1">
                          <img src={`${process.env.PUBLIC_URL}/assets/img/ecl.png`} style={{ cursor: 'pointer' }} alt="" />
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-1">
                          <h3 className="profile-name-dropdown">{data.dataUser.name}</h3>
                          <h3 className="profile-information-dropdown">{data.role} (default)</h3>
                          <h3 className="profile-information-dropdown" style={{ lineHeight: '0px' }}>NIP : {data.dataUser.nip}</h3>
                        </div>
                      </div>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="2" onClick={() => history.push('/profile')}>
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={handleShow}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </div>
              </div>
        </div>
      </div>

  );
};

export default Navbar;
