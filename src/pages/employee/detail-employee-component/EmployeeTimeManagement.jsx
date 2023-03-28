import React, { Fragment } from 'react';
import TabWithoutPermission from '../../../component/TabWithoutPermission';
import Overtime from '../tab-time-management-detail/Overtime';
import PaidLeave from '../tab-time-management-detail/PaidLeave';
import Permit from '../tab-time-management-detail/Permit';

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
      components: <PaidLeave key={2} id={id} /> ,
    },
    {
      tabName: 'permit',
      label: 'Permit',
      key: 2,
      components: <Permit key={3} id={id} />,
    }
  ];

  return (
    <Fragment>
      <TabWithoutPermission tabs={dataTabs} />
    </Fragment>
  );
};

export default EmployeeTimeManagement;
