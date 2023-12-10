import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import CustomTab from '../../component/CustomTab';
// import { isActionAllowed } from '../../utils/helper';
import RolePermission from './tabs/RolePermission';
import UserManagement from './tabs/UserManagement';

const Management = () => {
  const permissionData = useSelector(state => state.auth.permissions.filter(e => e.name === 'Management')[0]).permissions;
  const dataTabs = [
    {
      tabName : 'user',
      label: 'User Management',
      permissionName : 'user-management-permission-list',
      scopePermission : permissionData,
      components: <UserManagement key={'user'} />
    },
    {
      tabName : 'role',
      label: 'Role & Permission',
      permissionName : 'role-permission-list',
      scopePermission: permissionData,
      components: <RolePermission key={'role'} />
    },

  ];

  return (
    <Fragment>
      <h1 className="mt-4 breadcumb my-4">Management</h1>
      <CustomTab
        tabs={dataTabs}
      />
    </Fragment>
  );
};

export default withRouter(Management);
