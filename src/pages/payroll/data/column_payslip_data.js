import memoize from 'memoize-one';
import { rupiah, ucwords } from '../../../utils/helper';

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
    selector: row => row.total_salary,
    cell: row => (
      <div className="td-text mb-1">{rupiah(row.total_salary)}</div>
    )
  },
  {
    name: 'Detail',
    sortable: false,
    cell: row => (
      <button type="button" className="btn-detail" onClick={() => viewDetail(row.id)}>View</button>
    )
  },
]);

export default columnPayslipData;
