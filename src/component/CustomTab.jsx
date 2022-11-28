import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { isActionAllowed } from '../utils/helper';

const CustomTab = ({
  tabs,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].tabName);
  return (
    <Fragment>
      <ul className="mb-3 text-white nav nav-tabs" role="tablist">
        {
          tabs.map((e, index) => {
            if (isActionAllowed(e.scopePermission, e.permissionName)) {
              return (
                <li
                  key={index} 
                  className={`nav-item ${`nav-link ${activeTab === e.tabName ? 'active' : ''}`}`}
                  role="presentation"
                  onClick={() => setActiveTab(e.tabName)}
                  style={{
                    cursor: 'pointer'
                  }}
                >
                  {e.label}
                </li>
              );
            } else {
              return null;
            }
          })
        }
      </ul>
      <div className="tab-content">
        {
          tabs.map((children, index) => {
            if (activeTab === children.tabName) {
              return children.components;
            } else {
              return null;
            }
          })
        }
      </div>
    </Fragment>
  );
};

CustomTab.propTypes = {
  tabs : PropTypes.array.isRequired,
};


export default CustomTab;
