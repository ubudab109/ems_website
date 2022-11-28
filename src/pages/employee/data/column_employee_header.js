import memoize from "memoize-one";
import { rupiah, ucwords } from "../../../utils/helper";

const columnEmployee = memoize((viewDetail) => [
  {
    name: "Employee Name",
    sortable: true,
    cell: (row) => (
      <>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-2">
          <div
            className="td-text mb-1"
            style={{ color: "#00617F", fontWeight: "bold" }}
          >
            {row.firstname} {row.lastname}
          </div>
          <div className="td-text-mute">{row.nip}</div>
        </div>
      </>
    ),
  },
  {
    name: "Department",
    sortable: true,
    selector: (row) => row.division_name,
    cell: (row) => {
      if (row.division_name === null || row.division_name === "") {
        return (
          <>
            <div className="td-text mb-1">
              {ucwords("No Department Assigned")}
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className="td-text mb-1">{ucwords(row.division_name)}</div>
          </>
        );
      }
    },
  },
  {
    name: "Job Position",
    sortable: true,
    cell: (row) => (
      <>
        <div className="td-text mb-1">{ucwords(row.job_position)}</div>
      </>
    ),
  },
  {
    name: "Job Level",
    sortable: true,
    cell: (row) => (
      <>
        <div className="td-text mb-1">{ucwords(row.job_level)}</div>
      </>
    ),
  },
  {
    name: "Job Status",
    sortable: true,
    cell: (row) => (
      <>
        <div className="td-text mb-1">{ucwords(row.job_status_name)}</div>
      </>
    ),
  },
  {
    name: "Salary",
    sortable: true,
    cell: (row) => (
      <>
        <div className="td-text mb-1">{rupiah(row.total_salary)}</div>
      </>
    ),
  },
  {
    name: "Employee Status",
    sortable: true,
    cell: (row) => (
      <span
        className="badge badge-radius"
        onClick={() => viewDetail(row.id)}
        style={{
          background: row.status_badge.badge,
          color: row.status_badge.color,
        }}
      >
        {row.status_name}
      </span>
    ),
  },
]);

export default columnEmployee;
