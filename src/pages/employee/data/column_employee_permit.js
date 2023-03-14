import memoize from "memoize-one";
import { formatedDate } from "../../../utils/helper";

const columnEmployeePermit = memoize((viewDetail) => [
  {
    name: 'Created At',
    sortable: true,
    cell: (row) => (
      <div className="td-text mb-1 text-center">{formatedDate(row.created_at)}</div>
    )
  },
  {
    name: 'Title',
    sortable: true,
    cell: (row) => (
      <div className="td-text mb-1 text-center">{row.desc}</div>
    )
  },
  {
    name: "Start Date",
    sortable: true,
    cell: (row) => (
      <div className="td-text mb-1 text-center">{formatedDate(row.start_date)}</div>
    ),
  },
  {
    name: "End Date",
    sortable: true,
    cell: (row) => (
      <div className="td-text mb-1 text-center">{formatedDate(row.end_date)}</div>
    ),
  },
  {
    name: "Taken",
    sortable: true,
    cell: (row) => <div className="td-text mb-1 text-center">{row.taken} Days</div>,
  },
  {
    name: "Detail",
    sortable: false,
    cell: (row) => (
      <button type="button" className="btn-detail" onClick={() => viewDetail(row.id)}>View</button>
    ),
  },
]);

export default columnEmployeePermit;
