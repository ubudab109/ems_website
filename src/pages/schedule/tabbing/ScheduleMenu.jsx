/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";
import { useHistory } from "react-router-dom";
import moment from "moment";
import ButtonBlueFilter from "../../../component/ButtonBlueFilter";
import ButtonOrangeFilter from "../../../component/ButtonOrangeFilter";
import http from "../../../service/PrivateConfigRequest";
import CalendarDashboard from "../../../component/Calendar";
import DropdownDepartment from "../../employee/components/DropdownDepartment";
import swal from "sweetalert";
import {
  defaultNotifError,
  isActionAllowed,
  notifError,
  notifSuccess,
} from "../../../utils/helper";
import ButtonWhiteFilter from "../../../component/ButtonWhiteFilter";
import CustomModalDetail from "../../../component/CustomModalDetail";
import ModalCreateSchedule from "../modal/ModalCreateSchedule";
import method from "../../../service/Method";
import ModalChangeSchedule from "../modal/ModalChangeSchedule";
import ModalUpdateSchedule from "../modal/ModalUpdateSchedule";

const ScheduleMenu = () => {
  const permissionSchedule = useSelector(
    (state) => state.auth.permissions.filter((e) => e.name === "Schedule")[0]
  );
  const history = useHistory();
  const [oldDefaultSchedule, setOldDefaultSchedule] = useState({});
  const [selectedScheduled, setSelectedSchedule] = useState(0);
  const [defaultSchedule, setDefaultSchedule] = useState({});
  const [historySchedule, setHistorySchedule] = useState([]);
  const [detailSchedule, setDetailSchedule] = useState({
    name: "",
    clock_in: "",
    clock_out: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [holidayDate, setHolidayDate] = useState([]);
  const [holidayEvent, setHolidayEvent] = useState("");

  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalChange, setModalChange] = useState(false);
  const [formSchedule, setFormSchedule] = useState({
    name: "",
    clock_in: "",
    clock_out: "",
  });
  const [loadingForm, setLoadingForm] = useState({
    create: false,
    update: false,
    change: false,
    detail: false,
  });

  /**
   *
   * @param {String} stringTime
   * @returns
   */
  const formatingTime = (stringTime) => {
    const arrString = stringTime.split(":");
    return `${arrString[0]}.${arrString[1]}`;
  };

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
   * FETCH SCHEDULE
   */
  const fetchSchedule = async () => {
    setIsLoading(true);
    await http
      .get("company-schedule")
      .then((res) => {
        const data = res.data.data;
        setDefaultSchedule(data.default_schedule);
        setOldDefaultSchedule(data.default_schedule);
        setHistorySchedule(data.history_schedule);
        setSelectedSchedule(data.default_schedule.id);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          swal(err.response.data.message, {
            icon: "error",
          }).then(() => {
            history.push("/forbidden");
          });
        } else {
          notifError(
            "Error when fetching data",
            "Check Your connection or contact us if the problem still there"
          );
        }
        setIsLoading(false);
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
   * On Button Edit Clicked
   */
  const editButtonHandle = () => {
    if (isEditable) {
      setIsEditable(false);
      setDefaultSchedule(oldDefaultSchedule);
    } else {
      setIsEditable(true);
    }
  };

  /**
   * Handle modal show or close for create schedule
   */
  const handleModalCreateSchedule = () => {
    if (modalCreate) {
      setModalCreate(false);
      setFormSchedule({});
    } else {
      setModalCreate(true);
    }
  };

  /**
   * HANDLE MODAL SHOW OR CLOSE FOR CHANGE SCHEDULE
   */
  const handleModalChangeSchedule = () => {
    if (modalChange) {
      setModalChange(false);
      setSelectedSchedule(defaultSchedule.id);
    } else {
      setModalChange(true);
    }
  };

  /**
   * HANDLE MODAL DETAIL FOR UPDATE SCHEDULE DATA
   * @param {Number} scheduleId - ID Of Schedule ID
   */
  const handleModalUpdateSchedule = async (scheduleId) => {
    if (modalUpdate) {
      setModalUpdate(false);
      setDetailSchedule({
        name: "",
        clock_in: "",
        clock_out: "",
      });
    } else {
      setLoadingForm({...loadingForm, detail: true});
      setModalUpdate(true);
      await http.get(`company-schedule/${scheduleId}`)
      .then((res) => {
        const data = res.data.data;
        setDetailSchedule(data);
        setLoadingForm({...loadingForm, detail: false});
      }).catch(() => {
        notifError("Error", "Error when fetching detail. Make sure the data is exists or contact administrator if problem is different");
        setModalUpdate(false);
        setLoadingForm({...loadingForm, detail: false});
      })
    }
  }

  /**
   * HANDLER CHANGE RADIO BUTTON SELECT SCHEDULE
   * @param {Event} e
   */
  const onChangeSelectedSchedule = (e) => {
    setSelectedSchedule(e.target.value);
  };

  /**
   * HANDLE SAVE CHANGING SCHEDULE
   * @param {Event} e
   */
  const saveChangeSchedule = async (e) => {
    e.preventDefault();
    setLoadingForm({ ...loadingForm, change: true });
    await method
      .updateDataPut("change-default-schedule", {
        schedule_id: selectedScheduled,
      })
      .then(() => {
        setLoadingForm({ ...loadingForm, change: false });
        setModalChange(false);
        notifSuccess("Success", "Default Schedule Changed Successfully");
        fetchSchedule();
      })
      .catch(() => {
        defaultNotifError("changing");
        setLoadingForm({ ...loadingForm, change: false });
      });
  };

  /**
   * HANDLE CREATE NEW SCHEDULE
   * @param {Event} e
   * @returns {Promise}
   */
  const handleCreateSchedule = async (e) => {
    setLoadingForm({ ...loadingForm, create: true });
    let form = new FormData();
    if (
      formSchedule.name === "" ||
      formSchedule.clock_in === "" ||
      formSchedule.clock_out === ""
    ) {
      setLoadingForm({ ...loadingForm, create: false });
      return notifError("Failed", "All input is required");
    } else {
      form.append("name", formSchedule.name);
      form.append("clock_in", formSchedule.clock_in);
      form.append("clock_out", formSchedule.clock_out);

      await method
        .createDataWithoutUpload("company-schedule", form)
        .then(() => {
          setLoadingForm({ ...loadingForm, create: false });
          setModalCreate(false);
          setFormSchedule({
            name: "",
            clock_in: "",
            clock_out: "",
          });
          notifSuccess("Success", "Schedule Created Successfully");
          fetchSchedule();
        })
        .catch(() => {
          setLoadingForm({ ...loadingForm, create: false });
          defaultNotifError("creating");
        });
    }
  };

  /**
   * HANDLE UPDATE MAIN SCHEDULE
   * @param {Event} e
   */
  const handleSaveMainSchedule = async (e) => {
    e.preventDefault();
    if (
      defaultSchedule.name === "" ||
      defaultSchedule.clock_in === "" ||
      defaultSchedule.clock_out === ""
    ) {
      return notifError("Failed", "All input is required");
    } else {
      setLoadingForm({
        ...loadingForm,
        update: true,
      });
      let param = {
        name: defaultSchedule.name,
        clock_in: defaultSchedule.clock_in,
        clock_out: defaultSchedule.clock_out,
      };
      await method
        .updateDataByIdWithPut("company-schedule", defaultSchedule.id, param)
        .then(() => {
          setLoadingForm({
            ...loadingForm,
            update: false,
          });
          notifSuccess("Success", "Main Scheduled Successfully Updated");
          setIsEditable(false);
        })
        .catch(() => {
          setLoadingForm({
            ...loadingForm,
            update: false,
          });
          defaultNotifError("update");
        });
    }
  };

  /**
   * HANDLE SAVE UPDATE HISTORY SCHEDULE
   * @param {Event} e 
   */
  const handleSaveHistorySchedule = async (e) => {
    if (detailSchedule.name === "" || detailSchedule.clock_in === "" || detailSchedule.clock_out === "") {
      return notifError("Error", "All Input Is Required");
    } else {
      setLoadingForm({...loadingForm, update: true});
      await method.updateDataByIdWithPut('company-schedule', detailSchedule.id, {
        name: detailSchedule.name,
        clock_in: detailSchedule.clock_in,
        clock_out: detailSchedule.clock_out,
      }).then(() => {
        setLoadingForm({...loadingForm, update: false});
        setModalUpdate(false);
        notifSuccess("Success", "Data scheduled updated successfully");
        fetchSchedule();
      }).catch(() => {
        setLoadingForm({...loadingForm, update: false});
        defaultNotifError("updating");
      });
    }
  };

  /**
   * HANDLE EDIT MAIN SCHEDULE
   * @param {Event} e
   */
  const changeEditMainSchedule = (e) => {
    setDefaultSchedule({
      ...defaultSchedule,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * HANDLE REMOVE SCHEDULE
   * @param {Event} e
   * @param {Number} idSchedule - ID Of Schedule
   */
  const onRemoveSchedule = async (e, idSchedule) => {
    e.preventDefault();
    swal({
      title: "Delete This Schedule?",
      text: "Are You sure want to delete this Schedule. You can revert back this action",
      dangerMode: true,
      buttons: true,
      closeOnClickOutside: false,
      icon: "warning",
    }).then(async (isYes) => {
      if (isYes) {
        await method
          .deleteById("company-schedule", idSchedule)
          .then(() => {
            notifSuccess("Success", "Schedule Deleted Successfully");
            fetchSchedule();
          })
          .catch(() => {
            defaultNotifError("delete");
          });
      } else {
        return false;
      }
    });
  };

  /**
   * GENERATE QR CODE SCHEDULE
   */
  const generateQRCode = () => {
    const svg = document.getElementById("QRSchedule");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `QR ${defaultSchedule.name}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  }

  /**
   * COMPONPENT DID MOUNT
   */
  useEffect(() => {
    fetchSchedule();
    if (holidayDate.length < 1) {
      fetchHoliday(currentYear.toString());
    }

    return () => {
      setDefaultSchedule({});
      setHistorySchedule([]);
      setHolidayDate([]);
    };
  }, []);

  return (
    <Fragment>
      {/* MODAL CREATE SCHEDULE */}
      <CustomModalDetail
        show={modalCreate}
        handleClose={handleModalCreateSchedule}
        headerTitle="Create Schedule"
        children={
          <ModalCreateSchedule
            name={formSchedule.name}
            clockIn={formSchedule.clock_in}
            clockOut={formSchedule.clock_out}
            onChangeInput={(e) =>
              setFormSchedule({
                ...formSchedule,
                [e.target.name]: e.target.value,
              })
            }
          />
        }
        handleSave={(e) => handleCreateSchedule(e)}
        isEditable
        buttonName={loadingForm.create ? "Creating..." : "Submit"}
      />

      {/* MODAL CHANGE SCHEDULE */}
      <CustomModalDetail
        show={modalChange}
        handleClose={handleModalChangeSchedule}
        headerTitle={"Change Schedule"}
        children={
          <ModalChangeSchedule
            dataSchedule={historySchedule}
            selectedSchedule={selectedScheduled}
            onChangeSchedule={(e) => onChangeSelectedSchedule(e)}
          />
        }
        isEditable
        buttonName={loadingForm.change ? "Updating..." : "Change"}
        disabledButtonSave={loadingForm.change}
        handleSave={(e) => saveChangeSchedule(e)}
        size={"sm"}
      />

      {/* MODAL DETAIL FOR UPDATE SCHEDULE */}
      <CustomModalDetail 
        show={modalUpdate}
        handleClose={handleModalUpdateSchedule}
        headerTitle={"Update Schedule"}
        children={
          loadingForm.detail ? (
            <div>Fetching data....</div>
          ) :
          <ModalUpdateSchedule 
            name={detailSchedule.name}
            clockIn={detailSchedule.clock_in}
            clockOut={detailSchedule.clock_out}
            isEditAllowed={isActionAllowed(permissionSchedule.permissions, 'schedule-update')}
            onChangeInput={(e) => setDetailSchedule({...detailSchedule, [e.target.name]: e.target.value})}
          />
        }
        isEditable={isActionAllowed(permissionSchedule.permissions, 'schedule-update')}
        buttonName={loadingForm.update ? "Saving..." : "Save"}
        disabledButtonSave={loadingForm.update}
        handleSave={(e) => handleSaveHistorySchedule(e)}
      />
      <div className="row">
        {/* MAIN SCHEDULE */}
        <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 mt-2 mb-2">
          <div className="card card-shadow">
            <div className="card-body">
              <div className="col-xl-2 col-lg-12 col-md-12 col-sm-12 mt-2 ml-2">
                <h5 className="text-blue-dark" style={{ fontSize: "19px" }}>
                  Today Schedule
                </h5>
              </div>
              <div className="row mt-5">
                {isLoading ? (
                  <div>Fetching Schedule...</div>
                ) : historySchedule.length < 1 && defaultSchedule === null ? (
                  <div>
                    <h5>
                      This company branch not have any schedule or main
                      schedule. Add new schedule with clicking the button below
                    </h5>
                    <ButtonWhiteFilter
                      name="Add New Schedule"
                      onClick={() => handleModalCreateSchedule()}
                    />
                  </div>
                ) : (
                  <Fragment>
                    {/* TODAY SCHEDULE */}
                    <div className="col-xl-7 col-lg-6 col-md-12 mb-2">
                      <div className="form-group">
                        <label htmlFor="name" className="text-blue-dark">
                          Schedule Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={(e) => changeEditMainSchedule(e)}
                          id="name"
                          value={defaultSchedule.name}
                          disabled={!isEditable}
                          className="form-control input-border-grey"
                        />
                      </div>
                      <div className="form-group mt-4">
                        <label
                          htmlFor="created_date"
                          className="text-blue-dark"
                        >
                          Created Date
                        </label>
                        <input
                          type="text"
                          name="created_date"
                          value={moment(
                            new Date(defaultSchedule.created_at)
                          ).format("d MMMM YYYY")}
                          id="created_date"
                          disabled
                          className="form-control input-border-grey"
                        />
                      </div>
                      <div className="form-group mt-4">
                        <label htmlFor="Time" className="text-blue-dark">
                          Time
                        </label>
                        <br />
                        <span className="text-muted">
                          Set Schedule Clock In and Clock Out
                        </span>
                        <div className="d-flex flex-wrap justify-content-between mt-3">
                          <div className="col-5">
                            <label htmlFor="clock_in" className="text-bold">
                              Clock In
                            </label>
                            {isEditable ? (
                              <input
                                type="time"
                                name="clock_in"
                                id="clock_in"
                                onChange={(e) => changeEditMainSchedule(e)}
                                value={defaultSchedule.clock_in}
                                className="form-control input-border-grey"
                              />
                            ) : (
                              <div
                                className="mt-2"
                                style={{ borderBottom: "1px solid black" }}
                              >
                                <h3 className="text-blue-dark">
                                  {formatingTime(
                                    defaultSchedule.clock_in
                                      ? defaultSchedule.clock_in
                                      : "19:00:00 "
                                  )}
                                </h3>
                              </div>
                            )}
                          </div>

                          <div className="col-5">
                            <label htmlFor="clock_out" className="text-bold">
                              Clock Out
                            </label>
                            {isEditable ? (
                              <input
                                type="time"
                                name="clock_out"
                                onChange={(e) => changeEditMainSchedule(e)}
                                id="clock_out"
                                value={defaultSchedule.clock_out}
                                className="form-control input-border-grey"
                              />
                            ) : (
                              <div
                                className="mt-2"
                                style={{ borderBottom: "1px solid black" }}
                              >
                                <h3 className="text-blue-dark">
                                  {formatingTime(
                                    defaultSchedule.clock_out
                                      ? defaultSchedule.clock_out
                                      : "19:00:00"
                                  )}
                                </h3>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {isEditable ? (
                        <div className="mt-2">
                          <ButtonBlueFilter
                            name={loadingForm.update ? "Saving..." : "Save"}
                            disabled={loadingForm.update}
                            onClick={(e) => handleSaveMainSchedule(e)}
                          />
                        </div>
                      ) : null}
                    </div>

                    {/* QR CODE */}
                    <div className="col-xl-4 col-lg-6 col-md-12">
                      <div
                        style={{
                          border: "12px solid #19C8FF",
                          padding: "13px",
                        }}
                      >
                        <QRCode
                          id="QRSchedule"
                          size={256}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={process.env.REACT_APP_BACKEND_URL}
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                      <span className="text-muted text-center">
                        Code: {defaultSchedule.code}
                      </span>
                      <br />
                      <div className="col-12">
                        <button className="btn-blue" style={{ width: "100%" }} onClick={() => generateQRCode()}>
                          Export
                        </button>
                      </div>
                      <div className="row text-center mt-2">
                        <div className="col-6">
                          <ButtonBlueFilter
                            name="Change"
                            disabled={
                              !isActionAllowed(
                                permissionSchedule.permissions,
                                "schedule-update"
                              )
                            }
                            style={{
                              height: "25px",
                              fontSize: "12px",
                              width: "100%",
                              lineHeight: "16px",
                            }}
                            onClick={handleModalChangeSchedule}
                          />
                        </div>
                        <div className="col-6">
                          <ButtonOrangeFilter
                            name={isEditable ? "Cancel" : "Edit"}
                            onClick={() => editButtonHandle()}
                            disabled={
                              !isActionAllowed(
                                permissionSchedule.permissions,
                                "schedule-update"
                              )
                            }
                            style={{
                              height: "25px",
                              fontSize: "12px",
                              width: "100%",
                              lineHeight: "16px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* END MAIN SCHEDULE */}

        {/* CALENDAR & HISTORY */}
        <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12">
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
            <div className="card card-shadow" style={{ margin: "10px 10px" }}>
              <div className="d-flex flex-wrap justify-content-between">
                <h1
                  className="text-blue-dark text-left pl-20 mx-1"
                  style={{
                    fontSize: "18px",
                    paddingTop: "7px",
                  }}
                >
                  History
                </h1>
                <div onClick={() => handleModalCreateSchedule()}>
                  <button className="btn float-right">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/img/Add.png`}
                      alt=""
                    />
                  </button>
                </div>
              </div>
              <div className="divider-card" />
              <div
                className="scrollbar"
                style={{
                  overflowY: "scroll",
                  height: "30rem",
                }}
              >
                <table className="table" style={{ marginTop: "0" }}>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td>Fetching....</td>
                      </tr>
                    ) : (
                      historySchedule.map((val, key) => {
                        if (!val.is_default) {
                          return (
                            <tr key={key}>
                              <td>{val.name}</td>
                              <td className="text-center text-muted">
                                {val.code}
                              </td>
                              <td
                                className="text-center"
                                style={{ paddingLeft: "0" }}
                              >
                                <DropdownDepartment
                                  onEdit={() => handleModalUpdateSchedule(val.id)}
                                  onRemove={(e) => onRemoveSchedule(e, val.id)}
                                  isEditAllowed={isActionAllowed(
                                    permissionSchedule.permissions,
                                    "schedule-detail"
                                  )}
                                  isRemoveAllowed={
                                    isActionAllowed(
                                      permissionSchedule.permissions,
                                      "schedule-delete"
                                    ) && val.is_default === 0
                                  }
                                />
                              </td>
                            </tr>
                          );
                        }
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* END HISTORY */}
      </div>
    </Fragment>
  );
};

export default ScheduleMenu;
