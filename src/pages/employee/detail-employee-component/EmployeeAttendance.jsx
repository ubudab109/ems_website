/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, Fragment } from "react";
import swal from "sweetalert";
import Select from "react-select";
import http from "../../../service/PrivateConfigRequest";
import {
  MONTH_LIST,
  TIME_STATUS_OPTION,
  WORK_PLACES_OPTION,
} from "../../../utils/constant";
import {
  filterStyles,
  selectStyles,
} from "../../../style-component/ReactSelectFilterTable";
import { strToTime, ucwords, yearsOption } from "../../../utils/helper";
import ButtonWhiteFilter from "../../../component/ButtonWhiteFilter";
import DataTable from "react-data-table-component";
import columnEmployeAttendance from "../data/column_employee_attendance";
import CustomModalDetail from "../../../component/CustomModalDetail";
import DetailAttendance from "../../absent/modal/DetailAttendance";
import { Modal } from "react-bootstrap";
import method from "../../../service/Method";

const EmployeeAttendance = ({ id }) => {
  const date = new Date();
  const [dataAttendance, setDataAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const yearsFilter = yearsOption();
  const [filterAttendance, setFilterAttendance] = useState({
    month: MONTH_LIST[date.getMonth()],
    year: {
      value: date.getFullYear(),
      label: date.getFullYear(),
    },
    status: {
      value: "",
      label: "All (Default)",
    },
  });
  const [detailAttendance, setDetailAttendance] = useState({});
  const [shiftTime, setShiftTime] = useState("");
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);
  const [errorDetailAttendance, setErrorDetailAttendance] = useState(false);
  const [errorDetailMessages, setErrorDetailMessages] = useState("");
  const [showModalDetailAttendance, setShowModalDetailAttendance] =
    useState(false);
  const [showModalEditAttendance, setShowModalEditAttendance] = useState(false);
  const [formEditAttendance, setFormEditAttendance] = useState({});
  const [loadingEditAttendance, setLoadingEditAttendance] = useState(false);

  /**
   * This function returns a promise that resolves to the result of an HTTP GET request.
   * Request for get list attendance
   * @param {string} month
   * @param {string} year
   * @param {string} status
   * @returns An object with a property called data.
   */
  const requestDataAttendance = async (month, year, status) => {
    return await http.get(
      `employee/${id}?type=absent&date[month]=${month}&date[year]=${year}&status=${status}`
    );
  };

  /* A function that will be called when the component is mounted. */
  const callBackDataAttendance = useCallback(() => {
    let month = filterAttendance.month.value;
    let year = filterAttendance.year.value;
    let status = filterAttendance.status.value;
    return requestDataAttendance(month, year, status);
  }, [filterAttendance.month, filterAttendance.year, filterAttendance.status]);

  /**
   * Request Get Detail Attendance
   * @param {number} attendanceId
   * @returns {Promise}
   */
  const requestDetailAttendance = async (attendanceId) => {
    return await http.get(`attendance/${attendanceId}`);
  };

  /**
   * On View Click Handler
   * @param {number} attendanceId
   * @param {string} type
   */
  const onViewDetail = (attendanceId, type) => {
    if (type === "detail") {
      setShowModalDetailAttendance(true);
    } else if (type === "edit") {
      setShowModalEditAttendance(true);
    }
    setIsFetchingDetail(true);
    requestDetailAttendance(attendanceId)
      .then((res) => {
        let data = res.data.data.data;
        let shiftTime = res.data.data.shift_time;
        let formEdit = {
          id: data.id,
          work_places: {
            name: "work_places",
            value: data.work_places,
            label: data.workplace_name,
          },
          status_clock: {
            name: "status_clock",
            value: data.status_clock,
            label: data.absent_status,
          },
          clock_in: data.clock_in !== null ? strToTime(data.clock_in) : "",
          clock_out: data.clock_out !== null ? strToTime(data.clock_out) : "",
        };
        setFormEditAttendance(formEdit);
        setDetailAttendance(data);
        setShiftTime(shiftTime);
        setIsFetchingDetail(false);
      })
      .catch((err) => {
        setIsFetchingDetail(false);
        setErrorDetailAttendance(true);
        setErrorDetailMessages("Error When Fetching Data");
      });
  };

  /**
   * When the user clicks the close button, the modal is closed, the detail attendance is set to an
   * empty object, and the error detail attendance is set to false.
   */
  const handleCloseModalDetailAttendance = () => {
    setShowModalDetailAttendance(false);
    setDetailAttendance({});
    setErrorDetailAttendance(false);
  };

  /**
   * When the user clicks the close button, close the modal and clear the detailAttendance object.
   */
  const handleCloseModalEditAttendance = () => {
    setShowModalEditAttendance(false);
    setFormEditAttendance({});
    setDetailAttendance({});
  };

  /**
   * Handle Select FORM EDIT ATTENDANCE
   * @param {event} e
   */
  const handleSelectEditForm = (e) => {
    setFormEditAttendance({
      ...formEditAttendance,
      [e.name]: e,
    });
  };

  /**
   * Handle change edit form attendance
   * @param {event} e
   */
  const handleChangeEditAttendance = (e) => {
    setFormEditAttendance({
      ...formEditAttendance,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Fetching data attendance from callback then add to state
   */
  const fetchDataAttendance = () => {
    setIsLoading(true);
    callBackDataAttendance()
      .then((res) => {
        let data = res.data.data;
        setDataAttendance(data);
        setIsLoading(false);
      })
      .catch((err) => {
        swal({
          title: "Error When Fetching Data",
          text: "Check Your connection or contact us if the problem still there",
          icon: "error",
        });
        setIsLoading(false);
      });
  };

  /**
   * Handle to update selected attendance data
   * @param {event} e
   * @param {integer} id
   */
  const onSubmitEditAttendance = async (e, id) => {
    e.preventDefault();
    swal({
      title: "Are You Sure Want To Edit This Employee Attendance?",
      text: "Please check the form before submit",
      buttons: true,
      dangerMode: true,
      icon: "warning",
    }).then(async (isYes) => {
      if (isYes) {
        setLoadingEditAttendance(true);
        let data = {
          work_places: formEditAttendance.work_places.value,
          status_clock: formEditAttendance.status_clock.value,
          clock_in: formEditAttendance.clock_in,
          clock_out: formEditAttendance.clock_out,
        };
        await method
          .updateDataByIdWithPut("attendance", id, data)
          .then(() => {
            setLoadingEditAttendance(false);
            swal("Attendance Successfully Updated", {
              icon: "success",
            });
            setShowModalEditAttendance(false);
            fetchDataAttendance();
          })
          .catch(() => {
            setLoadingEditAttendance(false);
            swal({
              title: "Failed To Update Attendance",
              text: "Please check Your form. Contact administrator if the problem still exists",
              icon: "error",
            });
          });
      }
    });
  };

  /**
   * Component Did Mount
   */
  useEffect(() => {
    fetchDataAttendance();
    return () => {
      setDataAttendance([]);
    };
  }, [callBackDataAttendance]);

  return (
    <Fragment>
      {/* MODAL DETAIL ATTENDANCE */}
      <CustomModalDetail
        children={
          isFetchingDetail ? (
            <Fragment>
              <div className="row">
                <div className="col-12">Fetching Detail....</div>
              </div>
            </Fragment>
          ) : (
            <DetailAttendance
              errorMesages={errorDetailMessages}
              isError={errorDetailAttendance}
              avatar={
                detailAttendance.employee
                  ? detailAttendance.employee.avatar
                  : ""
              }
              division={
                detailAttendance.employee
                  ? detailAttendance.employee.division_name
                  : ""
              }
              role={
                detailAttendance.employee
                  ? ucwords(detailAttendance.employee.job_position)
                  : ""
              }
              employeeName={
                detailAttendance.employee
                  ? detailAttendance.employee.firstname +
                    " " +
                    detailAttendance.employee.lastname
                  : ""
              }
              nip={
                detailAttendance.employee ? detailAttendance.employee.nip : ""
              }
              absentBadge={detailAttendance.absent_badge}
              absentColor={detailAttendance.absent_color}
              absentStatus={detailAttendance.absent_status}
              workplaceBadge={detailAttendance.workplace_badge}
              workplaceColor={detailAttendance.workplace_color}
              workplaceName={detailAttendance.workplace_name}
              shiftTime={shiftTime}
              attendanceLocation={detailAttendance.attendance_location}
              clockIn={detailAttendance.clock_in}
              clockOut={detailAttendance.clock_out}
            />
          )
        }
        headerTitle="Detail Attendance"
        show={showModalDetailAttendance}
        handleClose={handleCloseModalDetailAttendance}
      />

      {/* MODAL EDIT ATTENDANCE */}
      <Modal
        show={showModalEditAttendance}
        onHide={handleCloseModalEditAttendance}
        size={"xl"}
        centered
      >
        <Modal.Header>
          <div
            className="d-flex justify-content-between"
            style={{ width: "100%" }}
          >
            <h4 className="text-blue-dark align-items-center align-self-center">
              Edit Employee Attendance
            </h4>
            <button className="btn" onClick={handleCloseModalEditAttendance}>
              <img src={`${process.env.PUBLIC_URL}/assets/img/x.png`} alt="" />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          {isFetchingDetail ? (
            <p>Loading....</p>
          ) : (
            <Fragment>
              <div className="row mt-4">
                <div className="form-group col-md-6">
                  <label htmlFor="work_places">Work Places</label>
                  <Select
                    onChange={handleSelectEditForm}
                    id="work_places"
                    name="work_places"
                    value={formEditAttendance.work_places}
                    options={WORK_PLACES_OPTION}
                    styles={selectStyles}
                    isClearable={false}
                    placeholder={"Select WorkPlaces..."}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="status_clock">Status Clock</label>
                  <Select
                    onChange={handleSelectEditForm}
                    id="status_clock"
                    name="status_clock"
                    value={formEditAttendance.status_clock}
                    options={TIME_STATUS_OPTION}
                    styles={selectStyles}
                    isClearable={false}
                    placeholder={"Select Status Clock..."}
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="form-group col-md-6">
                  <label htmlFor="clock_in">Clock In</label>
                  <input
                    type="time"
                    name="clock_in"
                    onChange={(e) => handleChangeEditAttendance(e)}
                    id="clock_in"
                    className="form-control input-border-gray"
                    value={formEditAttendance.clock_in}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="clock_out">Clock Out</label>
                  <input
                    type="time"
                    name="clock_out"
                    onChange={(e) => handleChangeEditAttendance(e)}
                    id="clock_out"
                    className="form-control input-border-gray"
                    value={formEditAttendance.clock_out}
                  />
                </div>
              </div>
            </Fragment>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn-blue"
            onClick={(e) => onSubmitEditAttendance(e, formEditAttendance.id)}
            disabled={loadingEditAttendance}
          >
            {loadingEditAttendance ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="btn-border-blue"
            onClick={handleCloseModalEditAttendance}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <div className="col-sm-12">
        <h5 className="text-blue-dark p-3">Attendance History</h5>
        <div className="d-flex flex-wrap justify-content-end mb-2">
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 mb-3 p-3">
            <div className="row">
              {/* MONTH FILTER */}
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 mt-2">
                <Select
                  id="status"
                  className="high-index"
                  options={MONTH_LIST}
                  styles={filterStyles}
                  isClearable={false}
                  onChange={(e) => {
                    setFilterAttendance({
                      ...filterAttendance,
                      month: e,
                    });
                  }}
                  value={filterAttendance.month}
                />
              </div>

              {/* YEAR  */}
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 mt-2">
                <Select
                  id="status"
                  className="high-index"
                  options={yearsFilter}
                  styles={filterStyles}
                  isClearable={false}
                  onChange={(e) => {
                    setFilterAttendance({
                      ...filterAttendance,
                      year: e,
                    });
                  }}
                  value={filterAttendance.year}
                />
              </div>

              {/* STATUS */}
              <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 mt-2">
                <Select
                  id="status"
                  className="high-index mr-5"
                  options={TIME_STATUS_OPTION}
                  styles={filterStyles}
                  isClearable={false}
                  onChange={(e) => {
                    setFilterAttendance({
                      ...filterAttendance,
                      status: e,
                    });
                  }}
                  value={filterAttendance.status}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 mt-2">
            <div
              className="btn-group btn-group-xl"
              style={{ float: "right", padding: "15px" }}
            >
              <ButtonWhiteFilter name="Export" />
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <DataTable
            columns={columnEmployeAttendance(onViewDetail)}
            data={dataAttendance}
            pagination
            progressPending={isLoading}
            fixedHeader
            fixedHeaderScrollHeight={"100vh"}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default EmployeeAttendance;
