import memoize from "memoize-one";
import { formatedDate } from "../../../utils/helper";

const columnEmployeePaidLeave = memoize((viewDetail, onCancel) => [
  {
    name: 'Created Date',
    selector: row => row.created_at,
    sortable: true,
    cell: (row) => (
      <div className="td-text mb-1 text-center">{formatedDate(row.created_at)}</div>
    ),
  },
  {
    name: "Start Date",
    selector: row => row.start_date,
    sortable: true,
    cell: (row) => (
      <div className="td-text mb-1 text-center">{formatedDate(row.start_date)}</div>
    ),
  },
  {
    name: "End Date",
    selector: row => row.end_date,
    sortable: true,
    cell: (row) => (
      <div className="td-text mb-1 text-center">{formatedDate(row.end_date)}</div>
    ),
  },
  {
    name: "Taken",
    selector: row => row.taken,
    sortable: true,
    cell: (row) => <div className="td-text mb-1 text-center">{row.taken} Days</div>,
  },
  {
    name: "Status",
    selector: row => row.status,
    sortable: true,
    cell: (row) => (
      <div className="td-text mb-1 text-center">
        <span
          className="badge badge-radius"
          style={{ background: row.badge_color }}
        >
          {row.status_name}
        </span>
      </div>
    ),
  },
  {
    name: "Detail",
    sortable: false,
    cell: (row) => (
      <button type="button" className="btn-detail" onClick={() => viewDetail(row.id)}>View</button>
    ),
  },
  {
    name: "",
    sortable: false,
    cell: (row) => {
      if (row.status === "1") {
        return (
          <div className="td-text mb-1 text-center">
            <a href="/#" onClick={(e) => onCancel(e, '0', row.id)}>
              Cancel
            </a>
          </div>
        );
      } else {
        return null;
      }
    },
  },
]);

export default columnEmployeePaidLeave;
