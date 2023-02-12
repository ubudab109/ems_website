import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

const TabWithoutPermission = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].tabName);
  return (
    <Fragment>
      <ul className="mb-3 text-white nav nav-tabs" role="tablist">
        {tabs.map((e, index) => {
          return (
            <li
              key={index}
              className={`nav-item ${`nav-link ${
                activeTab === e.tabName ? "active" : ""
              }`}`}
              role="presentation"
              onClick={() => setActiveTab(e.tabName)}
              style={{
                cursor: "pointer",
              }}
            >
              {e.label}
            </li>
          );
        })}
      </ul>
      <div className="tab-content">
        {tabs.map((children, index) => {
          if (activeTab === children.tabName) {
            return children.components;
          } else {
            return null;
          }
        })}
      </div>
    </Fragment>
  );
};

TabWithoutPermission.propTypes = {
  tabs : PropTypes.array.isRequired,
};

export default TabWithoutPermission;
