import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import CustomTab from '../../component/CustomTab';
import AttendanceManagement from './tabs/AttendanceManagement';



const Absen = () => {
  const permissionAttendance = useSelector(state => state.auth.permissions.filter(e => e.name === 'Attendance')[0]).permissions;
  const permissionEmployee = useSelector(state => state.auth.permissions.filter(e => e.name === 'Employee')[0]).permissions;

  const dataTabs = [
    {
      tabName : 'attendance',
      label: 'Attendance',
      permissionName : 'attendance-management-list',
      scopePermission : permissionAttendance,
      components: <AttendanceManagement key={'attendance'} />
    },
    {
      tabName : 'employee',
      label: 'Employee List',
      permissionName : 'employee-management-list',
      scopePermission: permissionEmployee,
      components: <h1 key={'employee'}>Test 2</h1>
    }
  ];

  return (
    <Fragment>
      <h1 className="mt-4 breadcumb">Attendance</h1>
      <CustomTab
        tabs={dataTabs}
      />
    </Fragment>
  );
};

export default Absen;
