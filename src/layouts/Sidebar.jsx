import React from 'react';
import { useSelector } from 'react-redux';
import routes from '../route/Route';
import superadminRoutes from '../route/RouteSuperadmin';
import { isActionAllowed } from '../utils/helper';
import Menu from './Menu';

const Sidebar = () => {
  /**
   * Selector to get data permissions from redux
   */
  const permissions = useSelector(state => state.auth.permissions);
  const isSuperAdmin = useSelector(state => state.auth.isSuperAdmin);
  const isLoggedIn = localStorage.getItem('web-token');
  return (
    <div className="border-end bg-sidebar" id="sidebar-wrapper">
      <div className="sidebar-heading">
        <p>
          PT. Trolley Digital Indonesia
        </p>
      </div>
      <div className="list-group list-group-flush">
        {
          isSuperAdmin ?
            superadminRoutes.map((route, index) => {
              return (
                <Menu
                  key={index}
                  icon={route.icon}
                  name={route.name}
                  path={route.path}
                  parentRoute={route.parentRoute}
                  canAccess={true}
                />
              );
            })
            :
            routes.map((route, index) => {
              if (!route.isSubRoute) {
                return (
                  <Menu
                    key={index}
                    icon={route.icon}
                    name={route.name}
                    path={route.path}
                    parentRoute={route.parentRoute}
                    canAccess={
                      isLoggedIn ?
                        isActionAllowed(
                          permissions.filter(
                            e => e.name === route.scopePermissions)[0].permissions,
                          route.listPermissions
                        )
                        : false
                    }
                  />
                );
              }
              return null;
            })
        }
      </div>
    </div>
  );
};

export default Sidebar;