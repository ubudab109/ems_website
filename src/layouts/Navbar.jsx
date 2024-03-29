/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { logoutProcess } from "../app/redux/reducer";
import { URL_SERVICE } from "../utils/constant";
import { clearAllItem, notifSuccess } from "../utils/helper";
import http from "../service/PrivateConfigRequest";
import CustomModal from "../component/CustomModal";
import { Link, useHistory } from "react-router-dom";
import "./layout.scss";
import { useEffect } from "react";
import usePoolingUpdate from "../hooks/usePoolingUpdate";

const Navbar = () => {
  /**
   * Navbar Dropdown
   */
  const [dropdownNotif, setDropdownNotif] = useState(false);
  const [dropdownProfile, setDropdownProfile] = useState(false);
  const [dataNotif, setDataNotif] = useState([]);
  const [totalNotif, setTotalNotif] = useState(0);
  const [subscription, setSubscription] = useState(null);

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
   * Toggle dropdown notif
   * @param {Event} event
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
   * @param {Event} event
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

  /**
   * REQUEST DATA NOTIF
   */
  const requestNotif = async () => {
    await http.get("dashboard/notification").then((res) => {
      const data = res.data.data;
      const totalNotRead = data.filter(value => !value.is_read);
      setTotalNotif(totalNotRead.length);
      setDataNotif(data);
    });
  };

  /**
   * READ ALL NOTIFICATION
   */
  const readAllNotif = async () => {
    await http.post('dashboard/read-all').then((res) => {
      const data = res.data.message;
      notifSuccess("Success", data);
      requestNotif();
    })
  };

  useEffect(() => {
    requestNotif();
    const id = setInterval(requestNotif, 300000);
    setSubscription(id);
    return () => {
      if (subscription) {
        clearInterval(subscription);
      }
    };
  }, []);

  return (
    <div className="">
      {/* MODAL LOGOUT */}
      <CustomModal
        show={show}
        handleClose={handleClose}
        text="Are you sure you want to log out of this account?"
        submitText="Sure"
        handleSure={logout}
      />
      {/* END */}
      <div className="responsive-custom">
        <nav className="navbar navbar-expand-lg nav-custom">
          <div className="row justify-content-end">
            <div className="col-xl-2 notif-margin ">
              <div className="col" onClick={toggleDropdownNotif}>
                <div className="photo-box" style={{ cursor: "pointer" }}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/notif1.png`}
                    width={35}
                    height={35}
                    alt=""
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "23px",
                      left: "91px",
                      color: "red",
                      fontWeight: "bolder",
                    }}
                  >
                    {totalNotif}
                  </span>
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
            <Dropdown.Menu
              show={dropdownNotif}
              className="dropdown-menu-notif"
              style={{
                overflowY: "scroll",
                height: "500px",
                width: "100%",
              }}
            >
              <Dropdown.Header>
                Notif
                <button className="btn-blue float-end" onClick={() => readAllNotif()}>Read All</button>  
              </Dropdown.Header>
              <hr />
              {/* LOOPING NOTIF */}
              {dataNotif.map((val, key) => (
                <Dropdown.Item
                  eventKey={key}
                  key={key}
                  as={Link}
                  to={val.fe_url}
                >
                  <span
                    style={{ whiteSpace: "pre-wrap" }}
                    className="text-bold"
                  >
                    {val.title} <span className="text-red">
                      {
                        !val.is_read ? "(New)" : ""
                      }
                    </span>
                  </span>
                  <br />
                  <span style={{ whiteSpace: "pre-wrap" }}>{val.message}</span>
                  <hr />
                </Dropdown.Item>
              ))}
              {/* END LOOPING */}
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
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
