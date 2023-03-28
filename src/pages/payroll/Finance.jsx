import React, { Fragment } from "react";
import { useSelector } from 'react-redux';
import CustomTab from "../../component/CustomTab";
import Payslip from "./tabbing/Payslip";

const Finance = () => {
  const payslipPermissions = useSelector(state => state.auth.permissions.filter(e => e.name === 'Payroll')[0]).permissions;
  const reiumbersementPermissions = useSelector(state => state.auth.permissions.filter(e => e.name === 'Employee Reimbursement')[0]).permissions;
  const dataTabs = [
    {
      tabName : 'payslip',
      label: 'Payslip',
      permissionName : 'payroll-management-list',
      scopePermission : payslipPermissions,
      components: <Payslip key={'payslip'} />
    },
    {
      tabName : 'reimbursement',
      label: 'Reimbursement',
      permissionName : 'employee-reimbursement-list',
      scopePermission: reiumbersementPermissions,
      components: <div key={'reimbursement'}>Reimbursement</div>
    },

  ];
  return (
    <Fragment>
      <h1 className="mt-4 breadcumb my-4">Finance</h1>
      <CustomTab
        tabs={dataTabs}
      />
    </Fragment>
  );
};

export default Finance;
