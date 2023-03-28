/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Select from 'react-select';
import SearchFilterInput from '../../../component/SearchFilterInput';
import DataTable from 'react-data-table-component';
import http from '../../../service/PrivateConfigRequest';
import { filterStyles } from '../../../style-component/ReactSelectFilterTable';
import { TIME_STATUS_OPTION, WORK_PLACES_OPTION } from '../../../utils/constant';
import DateButtonPicker from '../../../component/DateButtonPicker';
import columnAttendance from '../data/column_attendance_header';
import CustomModalDetail from '../../../component/CustomModalDetail';
import DetailAttendance from '../modal/DetailAttendance';
import { setMessageError, ucwords } from '../../../utils/helper';

const AttendanceManagement = () => {
  /**
   * history for route
   */
  const history = useHistory();

  /**
   * State for attendance data
   */
  const [attendanceData, setAttendanceData] = useState([]);
  const [detailAttendance, setDetailAttendance] = useState({});
  const [shiftTime, setShiftTime] = useState('');
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);
  const [errorDetailAttendance, setErrorDetailAttendance] = useState(false);
  const [errorDetailMessages, setErrorDetailMessages] = useState('');
  const [showModalDetailAttendance, setShowModalDetailAttendance] = useState(false);
  const [isLoadingAttendance, setIsLoadingAttendance] = useState(false);
  const [errorFetching, setErrorFetching] = useState('');

  /**
   * State for filter attendance
   */
  const [keyword, setKeyword] = useState('');
  const [workPlacesFilter, setWorkPlacesFilter] = useState({
    value: '',
    label: 'Work Places'
  });
  const [statusClockFilter, setStatusClockFilter] = useState({
    value: '',
    label: 'Clock'
  });
  const [dateFilter, setDateFilter] = useState(Date.now());
  const dateRef = useRef();



  /**
   * Search keyword data user event
   * @param {event} e 
   */
  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  }

  const onChangeDateFilter = (value) => {
    setDateFilter(value);
  }
  /**
   * Request get attendance list data
   * @param {*} keyword 
   * @param {*} workPlace 
   * @param {*} status 
   * @param {*} date 
   * @param {*} page 
   * @returns 
   */
  const requestGetAttendanceList = async (keyword, workPlace, status, date) => {
    return await http.get(`attendance?keyword=${keyword}&workPlaces=${workPlace}&statusClock=${status}&date=${date}`);
  }

  /**
   * Request Get Detail Attendance
   * @param {number} attendanceId 
   * @returns 
  */
  const requestDetailAttendance = async (attendanceId) => {
    return await http.get(`attendance/${attendanceId}`);
  }

  /**
   * Callback for request get attendance list
   */
  const fetchAttendanceList = useCallback(() => {
    let keywordSearch = keyword;
    let workPlaces = workPlacesFilter !== null ? workPlacesFilter.value : '';
    let status = statusClockFilter !== null ? statusClockFilter.value : '';
    let dateList = moment(new Date(dateFilter)).format('YYYY-MM-DD').toString();
    return requestGetAttendanceList(keywordSearch, workPlaces, status, dateList);
  }, [dateFilter, keyword, statusClockFilter, workPlacesFilter]);

  /**
   * Handle fetch all data for this page
   */
  const handleFetchAllData = () => {
    setIsLoadingAttendance(true);
    fetchAttendanceList().then((res) => {
      let attendanceData = res.data.data.data;
      setIsLoadingAttendance(false);
      setAttendanceData(attendanceData);
    }).catch((err) => {
      if (err.response.status === 403) {
        swal(err.response.data.message, {
          icon: 'error'
        }).then(() => {
          history.push('/forbidden');
        });
      } else {
        swal("Error when fetching data", {
          text: "Check Your connection or contact us if the problem still there",
          icon: "error",
        });
      }
      setIsLoadingAttendance(false);
      setErrorFetching('There Was An Error. Please Reload The Page');
    });
  };

  const handleViewDetail = (id) => {
    setShowModalDetailAttendance(true);
    setIsFetchingDetail(true);
    requestDetailAttendance(id)
      .then((res) => {
        let data = res.data.data.data;
        let shiftTime = res.data.data.shift_time;
        setDetailAttendance(data);
        setShiftTime(shiftTime);
        setIsFetchingDetail(false);
      }).catch(err => {
        setIsFetchingDetail(false);
        setErrorDetailAttendance(true);
        setErrorDetailMessages(setMessageError(err.response.status))
      });
  };

  const handleCloseModalDetailAttendance = () => {
    setShowModalDetailAttendance(false);
    setDetailAttendance({});
    setErrorDetailAttendance(false);
  };

  /**
   * On Component Mount
   */
  useEffect(() => {
    handleFetchAllData();
    return () => {
      setAttendanceData([]);
      setIsLoadingAttendance(false);
      setDetailAttendance({});
      setErrorDetailAttendance(null);
      setShowModalDetailAttendance(false);
    };
  }, [fetchAttendanceList]);
  


  return (
    <div className="tab-pane active" role="tabpanel" id="noanim-tab-example-tabpane-attendance">
      {/* MODAL DETAIL ATTENDANCE */}
      <CustomModalDetail
        children={
          isFetchingDetail ? 
          <Fragment>
            <div className="row">
              <div className="col-12">
                Fetching Detail....
              </div>
            </div>
          </Fragment>
          :
          <DetailAttendance
            errorMesages={errorDetailMessages}
            isError={errorDetailAttendance}
            avatar={
              detailAttendance.employee ?
                detailAttendance.employee.avatar :
                ''
            }
            division={
              detailAttendance.employee ?
                detailAttendance.employee.division_name
                :
                ''
            }
            role={
              detailAttendance.employee ? ucwords(detailAttendance.employee.job_position) : ''
            }
            employeeName={
              detailAttendance.employee ?
                detailAttendance.employee.firstname + ' ' + detailAttendance.employee.lastname
                :
                ''
            }
            nip={detailAttendance.employee ?
              detailAttendance.employee.nip
              :
              ''
            }
            absentBadge={
              detailAttendance.absent_badge
            }
            absentColor={
              detailAttendance.absent_color
            }
            absentStatus={
              detailAttendance.absent_status
            }
            workplaceBadge={
              detailAttendance.workplace_badge
            }
            workplaceColor={
              detailAttendance.workplace_color
            }
            workplaceName={
              detailAttendance.workplace_name
            }
            shiftTime={shiftTime}
            attendanceLocation={
              detailAttendance.attendance_location
            }
            clockIn={
              detailAttendance.clock_in
            }
            clockOut={
              detailAttendance.clock_out
            }
          />
        }
        headerTitle="Detail Attendance"
        show={showModalDetailAttendance}
        handleClose={handleCloseModalDetailAttendance}
      />
      {/* END MODAL */}
      <div className="d-flex flex-wrap">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card card-dashboard card-shadow">
            <div className="card-body" style={{ width: '100%' }}>

              {/* SEARCH AND FILTER */}
              <div className="row justify-content-left" style={{
                position: 'sticky',
                zIndex: '94',
              }}>
                <div className="col-xl-2 col-lg-12 col-md-12 col-sm-12 mt-2 ml-2">
                  <h5 className="text-blue-dark" style={{ fontSize: '19px' }}>Attendance List</h5>
                </div>
                <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 mb-2">
                  <SearchFilterInput
                    onChangeInput={e => onChangeKeyword(e)}
                    input={keyword}
                    canFilter={false}
                  />
                </div>
                {/* Filter */}
                <div className="col-xl-2 col-lg-6 col-md-12 col-sm-12 mb-2">
                  {/* FILTER ROLE */}
                  <Select
                    id="work-places"
                    options={WORK_PLACES_OPTION}
                    styles={filterStyles}
                    isClearable={workPlacesFilter !== null && workPlacesFilter.value !== '' ? true : false}
                    onChange={e => {
                      setWorkPlacesFilter(e);
                    }}
                    placeholder={'Work Places...'}
                    value={workPlacesFilter}
                  />
                </div>
                <div className="col-xl-2 col-lg-6 col-md-12 col-sm-12 mb-2">
                  {/* FILTER STATUS */}
                  <Select
                    id="work-places"
                    options={TIME_STATUS_OPTION}
                    styles={filterStyles}
                    isClearable={statusClockFilter !== null && statusClockFilter.value !== '' ? true : false}
                    onChange={e => {
                      setStatusClockFilter(e);
                    }}
                    placeholder={'Clock...'}
                    value={statusClockFilter}
                  />
                </div>

                <div className="col-xl-2 col-lg-12 col-md-12 col-sm-12">
                  {/* FILTER DATE */}
                  <DateButtonPicker
                    ref={dateRef}
                    dateText={moment(new Date(dateFilter)).format('ddd, DD/MM/YYYY').toString()}
                    handleChangeDate={onChangeDateFilter}
                  />
                </div>

                {/* END */}
              </div>
              {/* END */}

              {/* TABLE HERE */}
              <div className="row">
                <div className="table-responsive">
                  {
                    errorFetching ? 'Error When Fetching Data. Please Try Again' :
                      <DataTable
                        columns={columnAttendance(handleViewDetail)}
                        data={attendanceData}
                        progressPending={isLoadingAttendance}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight={'61vh'}
                      />
                  }
                </div>
              </div>
              {/* END */}

              {/* PAGINATION */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default AttendanceManagement;
