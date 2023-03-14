import React from 'react';
import { Fragment } from 'react';
import TabWithoutPermission from '../../../component/TabWithoutPermission';
import Payroll from '../tab-employee-finance-detail/Payroll';
import Reimbursement from '../tab-employee-finance-detail/Reimbursement';

const EmployeeFinance = ({id}) => {
  const dataTabs = [
    {
      tabName: 'payroll',
      label: 'Payroll',
      key: 0,
      components: <Payroll id={id} key={0} />
    },
    {
      tabName: 'reimbursement',
      label: 'Reimbursement',
      key: 1,
      components: <Reimbursement id={id} key={0} />
    }
  ];

  return (
    <Fragment>
      <TabWithoutPermission tabs={dataTabs} />
    </Fragment>
  )
};

export default EmployeeFinance;
