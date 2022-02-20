import React from 'react';
import { useSelector } from 'react-redux';
import routes from '../route/Route';
import Menu from './Menu';

const Sidebar = () => {
  /**
   * Selector to get data permissions from redux
   */
  const permissions = useSelector(state => state.auth.permissions);
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
          routes.map((route, index) => {
            return (
              <Menu 
                key={index}
                icon={route.icon}
                name={route.name}
                path={route.path}
                canAccess={isLoggedIn ? permissions[index].is_scope_access : false}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default Sidebar;