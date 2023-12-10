import React from "react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import UserManagementData from "./UserManagementData";

const UserManagament = ({ dataUser, isError, message, isLoading }) => {
  return (
    <div className="card card-dashboard card-shadow">
      <div
        className="row justify-content-between mt-4"
        style={{ width: "100%" }}
      >
        <div className="col-xl-6 col-lg-6 col-md-8">
          <h1
            className="text-blue-dark text-left mx-1"
            style={{
              fontSize: "18px",
              padding: "0px",
            }}
          >
            Users Management
          </h1>
        </div>
        <div className="row justify-content-around ml-2">
          <div className="divider-card mt-3 mb-3" />
          <div
            className="scrollbar"
            style={{
              overflowY: "scroll",
              height: "486px",
            }}
          >
            {isLoading ? (
              <Fragment>
                <span>Fetching Data....</span>
              </Fragment>
            ) : (
              dataUser.map((val, key) => {
                return (
                  <UserManagementData
                    key={key}
                    avatar={val.avatar}
                    name={val.name}
                    role={val.role}
                    status={val.is_online}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

UserManagament.propTypes = {
  dataUser: PropTypes.array,
  isError: PropTypes.bool,
  message: PropTypes.string,
  isLoading: PropTypes.bool,
};

UserManagament.defaultProps = {
  dataUser: [],
  isError: false,
  message: "",
  isLoading: false,
};

export default UserManagament;
