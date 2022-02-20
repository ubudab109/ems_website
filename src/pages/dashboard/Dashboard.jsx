import React, { Fragment, useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

const Dashboard = () => {

  const [date, setData] = useState(new Date());

  const onChangeDate = (data) => {
    setData(data);
  }

  return (
    <Fragment>
      <h1 className="mt-4 breadcumb">Dashboard</h1>
      <div className="row">
        <div className="col-xl-5 col-lg-5 col-md-11 col-sm-12">
          <div className="card card-shadow">
            <div className="d-flex justify-content-between px-3" style={{
              paddingTop : '5px'
            }}>
              <div className="col-6">
                <span className="text-blue-dark">Calender</span>
              </div>
            </div>
            <hr className="divider-gray" />
            <div className="card-body">
              <Calendar
                onChange={onChangeDate}
                value={date}
                // showNavigation={false}
                showNeighboringMonth={false}
                onViewChange={({ action, activeStartDate, value, view }) => alert('New view is: ', view)}
              />

            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
