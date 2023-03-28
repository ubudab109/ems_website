import memoize from 'memoize-one';
import { rupiah, ucwords } from '../../../utils/helper';
import ButtonPermissions from '../../../component/ButtonPermissions';

const columnPayslipData = memoize((viewDetail) => [
  {
    name: 'Employee Name',
    sortable: true,
    selector: row => row.firstname,
    cell: row => {
      return (
        <div className="td-text mb-1 " style={{ paddingLeft: '0px' }}>
          <span className="">{row.firstname} {row.lastname}</span>
          <br />
          <span className="text-muted">{row.nip}</span>
        </div>
      );
    }
  },
  {
    name: 'Departement',
    sortable: true,
    selector: row => row.division_name,
    cell: row => (
      <div className="td-text mb-1">{row.division_name}</div>
    )
  },
  {
    name: 'Job Position',
    sortable: true,
    selector: row => row.job_position,
    cell: row => (
      <div className="td-text mb-1">{ucwords(row.job_position)}</div>
    )
  },
  {
    name: 'Job Level',
    sortable: true,
    selector: row => row.job_level,
    cell: row => (
      <div className="td-text mb-1">{ucwords(row.job_level)}</div>
    )
  },
  {
    name: 'Payment Date',
    sortable: true,
    selector: row => row.payment_date_current,
    cell: row => (
      <div className="td-text mb-1">{row.payment_date_current}</div>
    )
  },
  {
    name: 'Total Payment',
    sortable: true,
    selector: row => row.pay_slip_sum_amount,
    cell: row => (
      <div className="td-text mb-1">{rupiah(row.pay_slip_sum_amount)}</div>
    )
  },
  {
    name: 'Status',
    sortable: true,
    selector: row => row.payslip_status.status,
    cell: row => {
      if (row.payslip_status.status === 'generated') {
        return (
          <div className="td-text mb-1">
            <span className="badge badge-radius" style={{ background: '#FCB756' }}>GENERATED</span>
          </div>
        );
      } else if (row.payslip_status.status === 'sended') {
        return (
          <div className="td-text mb-1">
            <span className="badge badge-radius" style={{ background: '#19C8FF' }}>SEND TO EMAIL</span>
          </div>
        );
      } else {
        return (
          <div className="td-text mb-1">
            <span className="badge badge-radius" style={{ background: '#FF1111' }}>FAILED</span>
          </div>
        );
      }
    }
  },
  {
    name: 'Detail',
    sortable: false,
    cell: row => (
      <ButtonPermissions
        scopePermission="Finance"
        permissionName="payslip-detail"
        handleClick={() => viewDetail(row.id)}
      />
    )
  },
]);

export default columnPayslipData;
