import React, { Fragment } from 'react';
import TabWithoutPermission from '../../../component/TabWithoutPermission';

const EmployeeTimeManagement = () => {
  const dataTabs = [
    {
      tabName: 'overtime',
      label: 'Overtime',
      components: (
        <div>Overtiem</div>
      ),
    },
    {
      tabName: 'paid-leave',
      label: 'Paid Leave',
      components: (
        <div>Paid Leave</div>
      ),
    },
    {
      tabName: 'permit',
      label: 'Permit',
      components: (
        <div>Permit</div>
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
