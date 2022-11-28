import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


const DetailDataUser = ({
  srcAvatar,
  name,
  email,
  role
}) => {
  return (
    <Fragment>
      <div className="row justify-content-center">
        <div className="col-xl-5 col-lg-5 col-md-8 col-sm-10">
          <img src={srcAvatar} alt="avatar" className="img-center img-circle" />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="form-group mb-3">
          <label className="text-blue-dark my-2" htmlFor="detail_name">Name</label>
          <input
            type="text"
            name=""
            id="detail_name"
            readOnly
            disabled
            className="form-control input-text-custom"
            value={name}
          />
        </div>

        <div className="form-group mb-3">
          <label className="text-blue-dark my-2" htmlFor="detail_email">Email</label>
          <input
            type="text"
            name=""
            id="detail_email"
            readOnly
            disabled
            className="form-control input-text-custom"
            value={email}
          />
        </div>

        <div className="form-group">
          <label className="text-blue-dark my-2" htmlFor="detail_role">Role</label>
          <input
            type="text"
            name=""
            id="detail_role"
            readOnly
            disabled
            className="form-control input-text-custom"
            value={role}
          />
        </div>
      </div>
    </Fragment>
  );
};

DetailDataUser.propTypes = {
  srcAvatar : PropTypes.string.isRequired,
  name : PropTypes.string.isRequired,
  email : PropTypes.string.isRequired,
  role : PropTypes.string.isRequired,
}

export default DetailDataUser;
