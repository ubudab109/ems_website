/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import ChartEmployee from "../../component/ChartEmployee";
import ChartWorkplaces from "../../component/ChartWorkplaces";
import ChartAttendance from "../../component/ChartAttendance";
import UserManagament from "./components/UserManagement";
import CalendarDashboard from "../../component/Calendar";
import http from "../../service/PrivateConfigRequest";
import CustomModalDetail from "../../component/CustomModalDetail";
import DetailDataUser from "../management/modal/DetailDataUser";
import MapGoogle from "../../component/GoogleMap";
import { formatingTime } from "../../utils/helper";

const Dashboard = () => {
  const branch = useSelector((state) => state.auth.branch);
  const [headBranch, setHeadBranch] = useState({
    id: "",
    name: "",
  });
  const [defaultSchedule, setDefaultSchedule] = useState({
    clock_in: "00:00:00",
    clock_out: "00:00:00",
  });
  const [loadingMainSchedule, setLoadingMainSchedule] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [holidayDate, setHolidayDate] = useState([]);
  const [holidayEvent, setHolidayEvent] = useState("");
  const [isFetchingManager, setIsFetchingManager] = useState(false);
  const [detailManager, setDetailManager] = useState();
  const [modal, setModal] = useState({
    detailManager: false,
    detailAddress: false,
  });
  const [dataUser, setDataUser] = useState([]);
  const [errorListManager, setErrorListManager] = useState({
    isError: false,
    message: "",
  });
  const [isLoadingListManager, setIsLoadingListManager] = useState(false);

  /**
   * Handler on date change in calendar
   * @param {Date} data
   */
  const onChangeDate = (data) => {
    setHolidayEvent("");
    let filterHoliday = holidayDate.find(
      (el) => el.date === moment(new Date(data)).format("YYYY-MM-DD").toString()
    );
    if (filterHoliday !== undefined) {
      setHolidayEvent(filterHoliday.name);
    } else {
      setHolidayEvent("");
    }
    setDate(data);
  };

  /**
   * CALLBACK FETCH HOLIDAYS
   */
  const fetchHoliday = async (year) => {
    return await http.get(`dataset/holidays?years=${year}`).then((res) => {
      let dataHoliday = [];
      let arrayData = Object.values(res.data.data);
      arrayData.forEach((item, i) => {
        if (item.data != null) {
          item.data.forEach((data, index) => {
            dataHoliday.push(data);
          });
        }
      });
      let filterHoliday = dataHoliday.find(
        (el) =>
          el.date === moment(new Date(year)).format("YYYY-MM-DD").toString()
      );
      if (filterHoliday !== undefined) {
        setHolidayEvent(filterHoliday.name);
      } else {
        setHolidayEvent("");
      }
      setHolidayDate(dataHoliday);
    });
  };

  /**
   * GET HEAD BRANCH MANAGER NAME
   * @returns {Promise}
   */
  const fetchHeadBranch = async () => {
    return await http.get("dashboard/head-branch").then((res) => {
      const data = res.data.data;
      setHeadBranch({
        id: data.user_manager_id,
        name: data.name,
      });
    });
  };

  /**
   * FETCH DATA USER MANAGER
   */
  const fetchDataUser = async () => {
    setIsLoadingListManager(true);
    await http
      .get("dashboard/manager")
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        setDataUser(data);
        setIsLoadingListManager(false);
      })
      .catch((err) => {
        const error = err.response.data;
        setErrorListManager({
          isError: true,
          message: error.message,
        });
        setIsLoadingListManager(false);
      });
  };

  /**
   * Set active start date handler
   * @param {String} value
   * @param {Event} event
   */
  const onChangeYear = (value, event) => {
    setActiveStartDate(value);
  };

  /**
   * Fetching Detail Employee
   * @param {Number} managerId
   */
  const fetchDataManager = async (managerId) => {
    setIsFetchingManager(true);
    await http
      .get(`user/${managerId}`)
      .then((res) => {
        let data = res.data.data;
        setIsFetchingManager(false);
        setDetailManager(data);
      })
      .catch((err) => {
        alert("Error When Fetching Data Employee. Please Try Again");
      });
  };

  /**
   * FETCH MAIN SCHEDULE
   */
  const fetchMainSchedule = async () => {
    setLoadingMainSchedule(true);
    await http.get("dashboard/attendance").then((res) => {
      const data = res.data.data.main_schedule;
      setDefaultSchedule(data);
      setLoadingMainSchedule(false);
    });
  };

  /**
   * HANDLE SHOW MODAL DETAIL MANAGER OR MAPS
   * @return {null}
   */
  const handleShowModal = (type) => {
    if (type === "manager") {
      fetchDataManager(parseInt(headBranch.id));
      setModal({ ...modal, detailManager: true });
    } else if (type === "maps") {
      setModal({ ...modal, detailAddress: true });
    } else {
      return null;
    }
  };

  /**
   * COMPONENT DID MOUNT
   */
  useEffect(() => {
    if (holidayDate.length < 1) {
      fetchHoliday(currentYear.toString());
    }
    fetchHeadBranch();
    fetchMainSchedule();
    fetchDataUser();
    return () => {
      setHeadBranch("");
      setHolidayDate([]);
      setDefaultSchedule({});
      setDataUser([]);
      setIsLoadingListManager(false);
      setErrorListManager({
        isError: false,
        message: "",
      });
    };
  }, []);

  return (
    <Fragment>
      {/* Modal Detail User */}
      <CustomModalDetail
        size="xl"
        children={
          isFetchingManager ? (
            <>
              <span>Fetching...</span>
            </>
          ) : (
            <DetailDataUser
              srcAvatar={detailManager ? detailManager.avatar : ""}
              name={detailManager ? detailManager.name : ""}
              email={detailManager ? detailManager.email : ""}
              role={detailManager ? detailManager.role : ""}
            />
          )
        }
        headerTitle={"Detail User"}
        show={modal.detailManager}
        handleClose={() => {
          setModal({ ...modal, detailManager: false });
        }}
        isEditable={false}
      />
      {/* Modal Maps Address */}
      <CustomModalDetail
        size={"xl"}
        children={<MapGoogle />}
        headerTitle={"Detail Address"}
        show={modal.detailAddress}
        handleClose={() => {
          setModal({ ...modal, detailAddress: false });
        }}
        isEditable={false}
      />
      <h1 className="mt-4 breadcumb">Dashboard</h1>
      <div className="row">
        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
          {/* COMPANY AND BRANCH */}
          <div className="col-12">
            <div className="card card-shadow" style={{ padding: "20px" }}>
              <h1
                className="text-blue-dark text-left pl-20 mb-3"
                style={{
                  fontSize: "20px",
                }}
              >
                Department
              </h1>
              <div className="row pl-20">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                  <div className="form-group">
                    <label className="text-bold" htmlFor="manager_name">
                      Head Branch
                    </label>
                    <input
                      type="text"
                      name="manager_name"
                      id="manager_name"
                      disabled
                      className="form-control input-border-grey"
                      value={headBranch.name === "" ? "..." : headBranch.name}
                    />
                    <span
                      className="float-end"
                      onClick={() => handleShowModal("manager")}
                      style={{
                        color: "#00617F",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Detail
                    </span>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                  <div className="form-group">
                    <label className="text-bold" htmlFor="branch_type">
                      Branch Type
                    </label>
                    <input
                      type="text"
                      disabled
                      name="branch_type"
                      id="branch_type"
                      className="form-control input-border-grey"
                      value={
                        branch.is_centered
                          ? "Center"
                          : `Branch Number ${branch.branch_order}`
                      }
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                  <div className="form-group">
                    <label className="text-bold" htmlFor="address">
                      Branch Location
                    </label>
                    <input
                      type="text"
                      disabled
                      name="address"
                      id="address"
                      className="form-control input-border-grey"
                      value={branch.address}
                    />
                    <span
                      className="float-end"
                      style={{
                        color: "#00617F",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={() => handleShowModal("maps")}
                    >
                      Detail
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ATTENDANCE */}
          <div className="col-12">
            <div className="row mt-4">
              {/* ATTENDANCE */}
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="card card-shadow" style={{ padding: "20px" }}>
                  <h1
                    className="text-blue-dark text-left mb-3"
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Attendance
                  </h1>
                  <div className="d-flex flex-wrap justify-content-between mt-3 mb-5">
                    {loadingMainSchedule ? (
                      <Fragment>
                        <span>Fetching Main Schedule...</span>
                      </Fragment>
                    ) : defaultSchedule !== null ? (
                      <Fragment>
                        <div className="col-5">
                          <label htmlFor="clock_in" className="text-bold">
                            Clock In
                          </label>
                          <div
                            className="mt-2"
                            style={{
                              borderBottom: "1px solid black",
                            }}
                          >
                            <h3 className="text-blue-dark">
                              {formatingTime(
                                defaultSchedule.clock_in
                                  ? defaultSchedule.clock_in
                                  : "19:00:00 "
                              )}
                            </h3>
                          </div>
                        </div>
                        <div className="col-5">
                          <label htmlFor="clock_out" className="text-bold">
                            Clock Out
                          </label>
                          <div
                            className="mt-2"
                            style={{
                              borderBottom: "1px solid black",
                            }}
                          >
                            <h3 className="text-blue-dark">
                              {formatingTime(
                                defaultSchedule.clock_out
                                  ? defaultSchedule.clock_out
                                  : "19:00:00"
                              )}
                            </h3>
                          </div>
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <span>
                          This Branch Does Not Have a Default Schedule. Create
                          Main Schedule In Schedule Menu First
                        </span>
                      </Fragment>
                    )}
                  </div>
                  <ChartAttendance />
                </div>
              </div>

              {/* WORKPLACES AND TOTAL EMPLOYEE */}
              <div className="col-xl-6 col-lg-6 col-md-12">
                {/* TOTAL EMPLOYEE */}
                <div
                  className="card card-shadow mb-5"
                  style={{ padding: "20px" }}
                >
                  <h1
                    className="text-blue-dark text-left mb-3"
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Total Employee
                  </h1>
                  <ChartEmployee />
                </div>

                {/* TOTAL WORKPLACES */}
                <div className="card card-shadow" style={{ padding: "20px" }}>
                  <h1
                    className="text-blue-dark text-left mb-3"
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Work Places
                  </h1>
                  <ChartWorkplaces />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CALENDAR AND USER MANAGEMENT */}
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
          {/* CALENDAR */}
          <div className="col-12">
            <CalendarDashboard
              date={date}
              month={activeStartDate.toLocaleString("default", {
                month: "long",
              })}
              year={currentYear.toString()}
              onActiveStartDate={({ activeStartDate }) => {
                if (
                  currentYear.toString() !==
                  activeStartDate.getFullYear().toString()
                ) {
                  setHolidayDate([]);
                  setCurrentYear(activeStartDate.getFullYear());
                  fetchHoliday(activeStartDate.getFullYear().toString());
                }
                setActiveStartDate(activeStartDate);
              }}
              onChangeDate={onChangeDate}
              yearChange={(value, event) => onChangeYear(value, event)}
              customContent={({ date, view }) => {
                let filterHoliday = holidayDate.find(
                  (el) =>
                    el.date ===
                    moment(new Date(date)).format("YYYY-MM-DD").toString()
                );
                if (view === "month") {
                  if (filterHoliday != null) {
                    return "text-red";
                  } else {
                    return null;
                  }
                }
              }}
              holiday={holidayEvent}
            />
          </div>

          <div className="col-12">
            <UserManagament
              dataUser={dataUser}
              isLoading={isLoadingListManager}
              isError={errorListManager.isError}
              message={errorListManager.message}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
