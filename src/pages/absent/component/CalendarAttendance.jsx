import React, { useCallback, useEffect, useState } from 'react';
import CalendarDashboard from '../../../component/Calendar';
import moment from 'moment';
import axios from 'axios';

const CalendarAttendance = () => {

  /**
   * State for calendar date
  */
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

  /**
   * Holiday Fetching
  */
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

  /**
   * on change year in calendar date
   * @param {*} value 
   * @param {*} event 
   */
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
  );
};

export default CalendarAttendance;
