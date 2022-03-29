import React, { Fragment, useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import Moment from 'moment';
import CardShadow from '../../component/CardShadow';
import http from '../../service/PrivateConfigRequest';
import CalendarDashboard from './components/Calendar';
import ChartEmployee from './components/ChartEmployee';
import EmployeeHoliday from './components/EmployeeHoliday';
import { Table } from 'react-bootstrap';
import UsePagination from '../../component/UsePagination';
import { isString } from '../../utils/helper';
import Holidays from 'date-holidays';


const Dashboard = () => {

  const [loadingActivities, setLoadingActivities] = useState(false);
  const [date, setDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1); // state for pagination current page
  const [lastPage, setLastPage] = useState(0); // state for pagination last page
  const [activitiesData, setActivitiesData] = useState([]);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  var hd = new Holidays('ID');
  /**
   * Handler on date change in calendar
   * @param {Date} data 
   */
  const onChangeDate = (data) => {
    setDate(data);
  }

  /**
   * Next Page in Pagination
   * @param {event} e 
   */
   const goToNextPage = (e) => {
    e.preventDefault();
    setCurrentPage(page => page + 1);
  };

  /**
   * Prev Page in Pagination
   * @param {event} e 
   */
  const goToPreviousPage = (e) => {
    e.preventDefault();
    setCurrentPage(page => page - 1);
  };

  /**
   * Go to Page in Pagination
   * @param {event} e 
   */
  const changePage = (event) => {
    event.preventDefault();
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  /**
   * Request to get activities data in selected date
   * @param {Date} date 
   * @param {Integer} page 
   * @returns {JSON}
   */
  const requestGetActivities = async (date, page) => {
    return await http.get(`dashboard/activities?date=${date}&page=${page}`);
  }


  /**
   * Callback for request get activities
   */
  const fetchActivities = useCallback(() => {
    let dateFilter = Moment(date).format('YYYY-MM-DD');
    let current_page = currentPage;
    return requestGetActivities(dateFilter, current_page);
  }, [date, currentPage]);


  useEffect(() => {
    setLoadingActivities(true);
    hd.getHolidays(activeStartDate.getFullYear())
    fetchActivities().then((res) => {
      let activitiesData = res.data.data.data;
      let lastPage = res.data.data.pagination.last_page;
      setActivitiesData(activitiesData);
      setLastPage(parseInt(lastPage));
      setLoadingActivities(false);
    }).catch((err) => {
      setLoadingActivities(false);
      alert('Error When Fetching Activities Data. Please Reload The Page');
    });

    return () => {
      setActivitiesData([]);
      setLastPage(0);
      setLoadingActivities(false);
    };
  }, [fetchActivities]);

  return (
    <Fragment>
      <h1 className="mt-4 breadcumb">Dashboard</h1>
      <div className="row">
        <div className="col-xl-8 col-lg-11 col-md-11 col-sm-11">
          <div className="row justify-content-between" style={{
            paddingLeft: '1.5%'
          }}>

            {/* CALENDER */}
            <div className="col-xl-7 col-lg-12 col-md-12 col-sm-12 mb-3">
              <CalendarDashboard
                date={date}
                month={activeStartDate.toLocaleString('default', { month: 'long' })}
                year={activeStartDate.getFullYear().toString()}
                onActiveStartDate={({ activeStartDate }) => {
                  setActiveStartDate(activeStartDate);
                }}
                onChangeDate={onChangeDate}
              />
            </div>

            {/* CHART EMPLOYEE */}
            <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12">
              <CardShadow>
                <div className="col-12">
                  <span className="text-blue-dark">Total Employee</span>
                </div>
                <ChartEmployee />
              </CardShadow>
            </div>


            {/* ACTIVITIES */}
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-3 mb-3">
              <CardShadow>
                <div className="row justify-content-between px-3">
                  <div className="col-12">
                    <span className="text-blue-dark font-16">Managament Activities</span>
                  </div>
                </div>
                <div className="divider-wrapper-calendar">
                  <hr className="divider-gray" />
                </div>
                {
                  loadingActivities ?
                    <p>Fetching Activities Data....</p>
                    :
                    <Fragment>
                      <div className="row v-50">
                        <Table striped hover responsive>
                          <thead>
                            <tr>
                              <th className="" style={{ paddingLeft: '29px' }}>Name</th>
                              <th className=" mx-2">Role</th>
                              <th className=" mx-2">Activities</th>
                              <th className=" mx-2">Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              activitiesData.length < 1 ?
                                <tr>
                                  <td colSpan={4}>No Data...</td>
                                </tr>
                                :
                                activitiesData.map((data, index) => {
                                  return (
                                    <tr key={index}>
                                      <td style={{ paddingLeft: '29px' }}>{data.name}</td>
                                      <td className="text-muted">{data.role}</td>
                                      <td className="text-muted">{data.activities}</td>
                                      <td className="text-muted">{data.time}</td>
                                    </tr>
                                  );
                                })
                            }
                          </tbody>
                        </Table>
                      </div>
                      {/* PAGINATION */}
                      <div className="row justify-content-end">
                        {
                          activitiesData.length > 0 ? 
                            <UsePagination
                              goToNextPage={(e) => goToNextPage(e)}
                              changePage={(e) => changePage(e)}
                              goToPreviousPage={(e) => goToPreviousPage(e)}
                              currentPage={currentPage}
                              pageLimit={isString(lastPage) ? 1 : lastPage}
                            />
                          : null
                        }
                      </div>
                    </Fragment>
                }
              </CardShadow>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-11 col-md-11 col-sm-11 ml-5">

          {/* ATTENDANCE */}
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
            <CardShadow>
              <div className="row justify-content-between px-3">
                <div className="col-12">
                  <span className="text-blue-dark">Attendance</span>
                </div>
              </div>
              <div className="divider-wrapper-calendar">
                <hr className="divider-gray" />
              </div>
              <div className="row justify-content-around">
                <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 border-right text-center">
                  <span className="text-success text-bold font-14">On Time</span>
                  <p className="mt-2 text-bold font-14">15</p>
                </div>
                <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 border-right text-center">
                  <span className="text-warning text-bold font-14">Late</span>
                  <p className="mt-2 text-bold font-14">2</p>
                </div>
                <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 text-center">
                  <span className="text-danger text-bold font-14">Absent</span>
                  <p className="mt-2 text-bold font-14">0</p>
                </div>
              </div>
            </CardShadow>
          </div>

          {/* EMPLOYEE HOLIDAY */}
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
            <CardShadow>
              <div className="row justify-content-between px-3">
                <div className="col-xl-8 col-lg-12 col-md-9 col-sm-12">
                  <span className="text-blue-dark">Employee on holiday</span>
                </div>
                <div className="col-xl-2 col-lg-4 col-md-2 col-sm-12">
                  <button className="btn-rounded-border-blue">03</button>
                </div>
              </div>
              <div className="divider-wrapper-calendar">
                <hr className="divider-gray" />
              </div>
              <div className="scrollable-div" style={{
                height: '500px'
              }}>
                {/* EMPLOYEE HOLIDAY DATA */}
                <EmployeeHoliday
                  badgeClass="badge-purple-holiday"
                  employeeName="Mandzukik"
                  image={`${process.env.PUBLIC_URL}/assets/img/ecl.png`}
                  statusLeave="On Leave"
                />
                <EmployeeHoliday
                  badgeClass="badge-orange-holiday"
                  employeeName="Mandzukik II"
                  image={`${process.env.PUBLIC_URL}/assets/img/ecl.png`}
                  statusLeave="Permission"
                />
                <EmployeeHoliday
                  badgeClass="badge-yellow-holiday"
                  employeeName="Mandzukik III"
                  image={`${process.env.PUBLIC_URL}/assets/img/ecl.png`}
                  statusLeave="Etc"
                />
              </div>
            </CardShadow>
          </div>
        </div>

      </div>

    </Fragment>
  );
};

export default Dashboard;
