import React from 'react';
import { NavLink } from 'react-router-dom';


const Menu = ({ 
  canAccess, path, icon, name,
}) => {
  if (canAccess) {
    return (
      <NavLink activeClassName="active" to={path} className="list-group-item list-group-item-action list-group-item-light p-3">
        <span className="title-list-item">
          <img src={icon} alt="" className="icon-sidebar" /> {name}
        </span>
      </NavLink>
    );
  }
  return null;
};

export default Menu;