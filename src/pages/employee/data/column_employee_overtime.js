import memoize from 'memoize-one';
import { formatedDate, formatingTime } from "../../../utils/helper";

const columnEmployeeOvertime = memoize((viewDetail) => [
  {
    name: "Date",
    sortable: true,
    selector: row => row.date,
    cell: row => (
      <div className="td-text mb-1">{formatedDate(row.date)}</div>
    )
  },
  {
    name: "Overtime In",
    sortable: true,
    selector: row => row.in,
    cell: row => (
      <div className="td-text mb-1">{formatingTime(row.in)}</div>
    )
  },
  {
    name: "Overtime Out",
    sortable: true,
    selector: row => row.out,
    cell: row => (
      <div className="td-text mb-1">{formatingTime(row.out)}</div>
    )
  },
  {
    name: 'Status',
    sortable: true,
    selector: row => row.status,
    cell: row => {
      return (
        <div className="td-text mb-1">
          <span className="badge badge-radius" style={{background: row.status_color}}>{row.status_name}</span>
        </div>
      );
    }
  },
  {
    name: 'Action',
    sortable: false,
    cell: row => (
      <button type="button" className="btn-detail" onClick={() => viewDetail(row.id)}>View</button>
    )
  }
]);

export default columnEmployeeOvertime;
