import React, { Fragment, useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import CardShadow from '../../component/CardShadow';
import ChartEmployee from '../../component/ChartEmployee';
import ChartWorkplaces from '../../component/ChartWorkplaces';
import ChartAttendance from '../../component/ChartAttendance';
import moment from 'moment';
import axios from 'axios';
import UserManagament from './components/UserManagement';
import DivisionManagement from './components/DivisionManagement';
import ScheduleManagement from './components/ScheduleManagement';
import CalendarDashboard from '../../component/Calendar';

const Dashboard = () => {

  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [holidayDate, setHolidayDate] = useState([]);
  const [holidayEvent, setHolidayEvent] = useState('');


  /**
   * Handler on date change in calendar
   * @param {Date} data 
   */
  const onChangeDate = (data) => {
    setHolidayEvent('');
    let filterHoliday = holidayDate.find(el => el.date === moment(new Date(data)).format('YYYY-MM-DD').toString());
    if (filterHoliday !== undefined) {
      setHolidayEvent(filterHoliday.name);
    } else {
      setHolidayEvent('');
    }
    setDate(data);
  }

  const fetchHoliday = useCallback(async () => {
    let year = activeStartDate;
    return await axios.get(`https://kalenderindonesia.com/api/APIz5p37t16Zt/libur/masehi/${year.getFullYear()}`).then((res) => {
      let dataHoliday = [];
      let arrayData = Object.values(res.data.data['holiday'])
      arrayData.forEach((item, i) => {
        if (item.data != null) {
          item.data.forEach((data, index) => {
            dataHoliday.push(data);
          })
        }
      });
      let filterHoliday = dataHoliday.find(el => el.date === moment(new Date(year)).format('YYYY-MM-DD').toString());
      if (filterHoliday !== undefined) {
        setHolidayEvent(filterHoliday.name);
      } else {
        setHolidayEvent('');
      }
      setHolidayDate(dataHoliday);
    });
  }, [activeStartDate]);

  const onChangeYear = (value, event) => {
    setActiveStartDate(value);
  }

  useEffect(() => {
    fetchHoliday();

    return () => {
      setHolidayDate([]);
    };
  }, [fetchHoliday]);

  return (
    <Fragment>
      <h1 className="mt-4 breadcumb">Dashboard</h1>
      <div className="row-1">
        <CardShadow title="Total Employee">
          <div className="col-12">
            <ChartEmployee />
          </div>
        </CardShadow>

        <CardShadow title="Work Places">
          <div className="col-12">
            <ChartWorkplaces />
          </div>
        </CardShadow>

        <ChartAttendance 
          gapChart="41px"
        />

        <CalendarDashboard
          date={date}
          month={activeStartDate.toLocaleString('default', { month: 'long' })}
          year={activeStartDate.getFullYear().toString()}
          onActiveStartDate={({ activeStartDate }) => {
            setActiveStartDate(activeStartDate);
          }}
          onChangeDate={onChangeDate}
          yearChange={(value, event) => onChangeYear(value, event)}
          customContent={({ date, view }) => {
            let filterHoliday = holidayDate.find(el => el.date === moment(new Date(date)).format('YYYY-MM-DD').toString());
            if (view === 'month') {
              if (filterHoliday != null) {
                return 'text-red';
              } else {
                return null;
              }
            }
          }}
          holiday={holidayEvent}

        />
      </div>

      <div className="row-1">
        <UserManagament />
        <DivisionManagement />
        <ScheduleManagement />
      </div>

    </Fragment>
  );
};

export default Dashboard;
