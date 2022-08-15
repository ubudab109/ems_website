import React, { Fragment } from 'react';
import PageHeading from "./components/employee/PageHeading/pageheading"

const Employee = () => {
  return (
    <Fragment>
      <div>
        <div id='wrapper'>      
          <div id="content-wrapper" className="d-flex flex-column"> 
              <div id="content"> 
                <div className='container-fluid p-2'>
                <PageHeading />
                </div>
              </div>
          </div>
          </div>
    </div>
    </Fragment>
  );
};

export default Employee;
