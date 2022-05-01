import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { isActionAllowed } from '../../utils/helper';
import AttendanceManagement from './tabs/AttendanceManagement';


const Absen = () => {
  const permissionAttendanceData = useSelector(state => state.auth.permissions.filter(e => e.name === 'Attendance')[0]);
  const permissionEmployeeData = useSelector(state => state.auth.permissions.filter(e => e.name === 'Employee')[0]);
  const { path, url } = useRouteMatch();
  const [tabActive, setTabActive] = useState('');
  const onTabChange = (tabName) => {
    setTabActive(tabName);
  }

  const isTabActive = (currentTab) => {
    return window.location.pathname === `${path}/${currentTab}`;
  }

  return (
    <Fragment>
      <h1 className="mt-4 breadcumb">Attendance</h1>
      <ul className="mb-3 text-white nav nav-tabs" role="tablist">
        {
          isActionAllowed(permissionAttendanceData.permissions, 'attendance-management-list')
            ?
            <li className="nav-item" role="presentation">
              <Link
                to={`${path}/attendance`}
                type="button"
                id="noanim-tab-example-tab-attendance"
                role="tab"
                className={`nav-link ${isTabActive('attendance') ? 'active' : ''}`}
                onClick={() => onTabChange('attendance')}
              >
                Attendance
              </Link>
            </li> : null
        }
        {
          isActionAllowed(permissionEmployeeData.permissions, 'employee-management-list')
            ?
            <li className="nav-item" role="presentation">
              <Link
                to={`${path}/role`}
                type="button"
                id="noanim-tab-example-tab-employee"
                role="tab"
                className={`nav-link ${isTabActive('employee') || tabActive === 'employee' ? 'active' : ''}`}
                tabIndex="-1"
                onClick={() => onTabChange('employee')}
              >
                Employee List
              </Link>
            </li> : null
        }
      </ul>
      <div className="tab-content">
        <Switch>
          <Fragment>
            <Route exact path={`${url}/attendance`} children={
              <AttendanceManagement
                tabActive={isTabActive('attendance')}
              />
            } />
            <Route path={`${url}/employee`} children={
              <h1>Test 2</h1>
            } />
          </Fragment>
        </Switch>
      </div>
    </Fragment>
  );
};

export default withRouter(Absen);
