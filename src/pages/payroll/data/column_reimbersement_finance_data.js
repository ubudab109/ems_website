import memoize from 'memoize-one';
import { formatedDate, ucwords } from '../../../utils/helper';
import ButtonPermissions from '../../../component/ButtonPermissions';

const columnReimbersementFinanceData = memoize((viewDetail) => [
  {
    name: 'Employee Name',
    sortable: true,
    selector: row => row.employee.firstname,
    cell: row => {
      return (
        <div className="td-text mb-1 " style={{ paddingLeft: '0px' }}>
          <span className="">{row.employee.firstname} {row.employee.lastname}</span>
          <br />
          <span className="text-muted">{row.employee.nip}</span>
        </div>
      );
    }
  },
  {
    name: 'Department',
    sortable: true,
    selector: row => row.employee.division_name,
    cell: row => (
      <div className="td-text mb-1">{row.employee.division_name}</div>
    )
  },
  {
    name: 'Job Position',
    sortable: true,
    selector: row => row.employee.job_position,
    cell: row => (
      <div className="td-text mb-1">{ucwords(row.employee.job_position)}</div>
    )
  },
  {
    name: 'Payment Date',
    sortable: true,
    selector: row => row.date,
    cell: row => (
      <div className="td-text mb-1">{formatedDate(row.date)}</div>
    )
  },
  {
    name: 'Detail',
    sortable: false,
    cell: row => (
      <ButtonPermissions
        scopePermission="Employee Reimbursement"
        permissionName="employee-reimbursement-detail"
        handleClick={() => viewDetail(row.id)}
      />
    )
  },
]);

export default columnReimbersementFinanceData;
