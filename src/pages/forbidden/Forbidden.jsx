import React, { Fragment } from 'react';

const Forbidden = () => {
  return (
    <Fragment>
      <div className="row justify-content-center">
        <div className="col-xl-12 col-lg-12 col-md-10 col-sm-8">
          <h1>401</h1>
          <p>You Can't Access This Page</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Forbidden;
