import memoize from "memoize-one";
import { formatedDate, formatingTime } from "../../../utils/helper";
import DropdownAttendance from "../components/DropdownAttendance";

const columnEmployeAttendance = memoize((viewDetail) => [
  {
    name: "Date",
    sortable: true,
    cell: row => (
      <div className="td-text mb-1">{formatedDate(row.date)}</div>
    )
  }, 
  {
    name: "Clock In",
    sortable: true,
    cell: row => (
      <div className="td-text mb-1">{formatingTime(row.clock_in)}</div>
    )
  },
  {
    name: "Clock Out",
    sortable: true,
    cell: row => {
      if (row.clock_out !== null) {
        return(
          <div className="td-text mb-1">{formatingTime(row.clock_out)}</div>
        );
      } else {
        return (
          <div className="td-text mb-1">-</div>
        );
      }
    }
  },
  {
    name: "Work Places",
    sortable: true,
    cell: row => {
      if (row.absent_status !== "Absent") {
        return (
          <span
            className="badge badge-radius"
            style={{
              background: row.workplace_badge,
              color: row.workplace_color,
            }}
          >
            {row.workplace_name}
          </span>
        );
      } else {
        return (
          <span
            className="badge badge-radius"
            style={{
              background: row.absent_badge,
              color: row.absent_color,
            }}
          >
            {row.absent_status}
          </span>
        );
      }
    }
  },
  {
    name: "Status",
    sortable: true,
    selector: (row) => row.status_clock,
    cell: (row) => (
      <span
        className="badge badge-radius"
        style={{
          background: row.absent_badge,
          color: row.absent_color,
        }}
      >
        {row.absent_status}
      </span>
    ),
  },
  {
    name: "Action",
    sortable: false,
    selector: row => row.id,
    cell: row => {
      return (
        <DropdownAttendance onViewDetail={() => viewDetail(row.id, 'detail')} onEdit={() => viewDetail(row.id, 'edit')} />
      )
    }
  }
]);

export default columnEmployeAttendance;
