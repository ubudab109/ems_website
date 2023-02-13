import memoize from 'memoize-one';
import { formatedDate, formatingTime } from "../../../utils/helper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const columnEmployeeOvertime = memoize((viewDetail) => [
  {
    name: "Date",
    sortable: true,
    cell: row => (
      <div className="td-text mb-1">{formatedDate(row.date)}</div>
    )
  },
  {
    name: "Overtime In",
    sortable: true,
    cell: row => (
      <div className="td-text mb-1">{formatingTime(row.in)}</div>
    )
  },
  {
    name: "Overtime Out",
    sortable: true,
    cell: row => (
      <div className="td-text mb-1">{formatingTime(row.in)}</div>
    )
  },
  {
    name: 'Status',
    sortable: true,
    cell: row => {
      if (row.status === '0') {
        return (
          <div className="td-text mb-1 text-warning">Pending</div>
        );
      } else if (row.status === '1') {
        return (
          <div className="td-text mb-1 text-success">Applied</div>
        );
      } else {
        return (
          <div className="td-text mb-1 text-danger">Rejected</div>
        );
      }
    }
  },
  {
    name: 'Action',
    sortable: false,
    cell: row => (
      <FontAwesomeIcon
        icon={faEye}
        onClick={() => viewDetail(row.id, 'detail')}
        style={{ color: 'rgb(0, 97, 127)', cursor: 'pointer' }}
        title="Detail"
      />
    )
  }
]);

export default columnEmployeeOvertime;
