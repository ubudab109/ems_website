import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { isActionAllowed } from '../../utils/helper';
import RolePermission from './tabs/RolePermission';
import UserManagement from './tabs/UserManagement';
import AddRolePermissions from './views/AddRolePermission';

const Management = () => {
  const permissionData = useSelector(state => state.auth.permissions.filter(e => e.name === 'Management')[0]);

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
      <h1 className="mt-4 breadcumb my-4">Management</h1>
      <ul className="mb-3 text-white nav nav-tabs" role="tablist">
        {
          isActionAllowed(permissionData.permissions, 'user-management-permission-list')
            ?
            <li className="nav-item" role="presentation">
              <Link
                to={`${path}/user`}
                type="button"
                id="noanim-tab-example-tab-user"
                role="tab"
                className={`nav-link ${isTabActive('user') ? 'active' : ''}`}
                onClick={() => onTabChange('user')}
              >
                User Management
              </Link>
            </li> : null
        }
        {
          isActionAllowed(permissionData.permissions, 'role-permission-list')
            ?
            <li className="nav-item" role="presentation">
              <Link
                to={`${path}/role`}
                type="button"
                id="noanim-tab-example-tab-role"
                role="tab"
                className={`nav-link ${isTabActive('role') || tabActive === 'role' ? 'active' : ''}`}
                tabIndex="-1"
                onClick={() => onTabChange('role')}
              >
                Role &amp; Permission
              </Link>
            </li> : null
        }
      </ul>

      <div className="tab-content">
        <Switch>
          <Fragment>
            <Route exact path={`${url}/user`} children={
              <UserManagement
                tabActive={isTabActive('user') ? true : false}
              />
            } />
            <Route path={`${url}/role`} children={
              <RolePermission
                tabActive={isTabActive('role') || tabActive === 'role' ? true : false}
              />
            } />
            <Route exact path={`${url}/add/role`} children={<AddRolePermissions tabActive={isTabActive('role') || tabActive === 'role' ? true : false} />} />
          </Fragment>
        </Switch>
      </div>
    </Fragment>
  );
};

export default withRouter(Management);
