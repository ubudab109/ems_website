import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import CustomTab from '../../component/CustomTab';
import AttendanceManagement from './tabs/AttendanceManagement';



const Absen = () => {

  return (
    <Fragment>
      <h1 className="mt-4 breadcumb">Attendance</h1>
      <AttendanceManagement />
    </Fragment>
  );
};

export default Absen;
