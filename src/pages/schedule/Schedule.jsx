import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import CustomTab from "../../component/CustomTab";
import ScheduleMenu from './tabbing/ScheduleMenu';

const Schedule = () => {
  const schedulePermissions = useSelector(state => state.auth.permissions.filter(e => e.name === 'Schedule')[0]).permissions;
  const overtimePermissions = useSelector(state => state.auth.permissions.filter(e => e.name === 'Employee Overtime')[0]).permissions;
  const dataTabs = [
    {
      tabName : 'schedule',
      label: 'Schedule',
      permissionName : 'schedule-list',
      scopePermission : schedulePermissions,
      components: <ScheduleMenu key={0} />
    },
    {
      tabName : 'overtime',
      label: 'Overtime',
      permissionName : 'employee-overtime-list',
      scopePermission: overtimePermissions,
      components: <div key={1}>Overtime</div>
    },

  ];

  return (
    <Fragment>
      <h1 className="mt-4 breadcumb">Time Management</h1>
      <CustomTab
        tabs={dataTabs}
      />
    </Fragment>
  );
};

export default Schedule;
