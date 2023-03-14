import memoize from "memoize-one";
import { formatedDate, formatingTime } from "../../../utils/helper";
import DropdownAttendance from "../components/DropdownAttendance";

const columnEmployeAttendance = memoize((onViewDetail) => [
  {
    name: "Date",
    sortable: true,
    selector: row => row.date,
    cell: row => (
      <div className="td-text mb-1">{formatedDate(row.date)}</div>
    )
  }, 
  {
    name: "Clock In",
    sortable: true,
    selector: row => row.clock_in,
    cell: row => (
      <div className="td-text mb-1">{formatingTime(row.clock_in)}</div>
    )
  },
  {
    name: "Clock Out",
    sortable: true,
    selector: row => row.clock_out,
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
    selector: row => row.workplace_name,
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
        <DropdownAttendance onViewDetail={() => onViewDetail(row.id, 'detail')} onEdit={() => onViewDetail(row.id, 'edit')} />
      )
    }
  }
]);

export default columnEmployeAttendance;
