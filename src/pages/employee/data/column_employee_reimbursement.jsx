import memoize from "memoize-one";
import { formatedDate, rupiah } from "../../../utils/helper";

const columnEmployeeReimbursement = memoize((viewDetail) => [
  {
    name: "Date",
    sortable: true,
    selector: (row) => row.date,
    cell: (row) => <div className="td-text mb-1">{formatedDate(row.date)}</div>,
  },
  {
    name: "Claim Type",
    sortable: true,
    selector: (row) => row.claim_type,
    cell: (row) => <div className="td-text mb-1">{row.claim_type}</div>,
  },
  {
    name: "Total",
    sortable: true,
    selector: (row) => row.amount,
    cell: (row) => (
      <div className="td-text mb-1" style={{ color: "#FF5900" }}>
        {rupiah(row.amount)}
      </div>
    ),
  },
  {
    name: "Status",
    sortable: true,
    selector: (row) => row.status_name,
    cell: (row) => (
      <div className="td-text mb-1">
        <span
          className="badge badge-radius"
          style={{ background: row.status_color }}
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
      <button
        type="button"
        className="btn-detail"
        onClick={() => viewDetail(row.id)}
      >
        View
      </button>
    ),
  },
]);

export default columnEmployeeReimbursement;
