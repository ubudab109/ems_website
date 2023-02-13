import React, { Fragment } from 'react';
import TabWithoutPermission from '../../../component/TabWithoutPermission';
import Overtime from '../tab-time-management-detail/Overtime';

const EmployeeTimeManagement = ({ id }) => {
  const dataTabs = [
    {
      tabName: 'overtime',
      label: 'Overtime',
      key: 0,
      components: <Overtime key={1} id={id} />,
    },
    {
      tabName: 'paid-leave',
      label: 'Paid Leave',
      key: 1,
      components: (
        <div key={2}>Paid Leave</div>
      ),
    },
    {
      tabName: 'permit',
      label: 'Permit',
      key: 2,
      components: (
        <div key={3}>Permit</div>
      ),
    }
  ];

  return (
    <Fragment>
      <TabWithoutPermission tabs={dataTabs} />
    </Fragment>
  );
};

export default EmployeeTimeManagement;
