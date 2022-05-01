import memoize from 'memoize-one';
import ButtonPermissions from "../../../component/ButtonPermissions";

const columnAttendance = memoize( 
  viewDetail => [
    {
      name: 'ID',
      selector : row => row.id,
      sortable: true,
      
    },
    {
      name: 'Employee Name',
      sortable: true,
      cell : row => (
        <>
          <img
            className="img-circle"
            src={row.employee.avatar}
            alt=""
            width={50}
            style={{ marginRight: '3px', paddingBottom: '1px' }}
          />
          <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 p-2">
            <div className="td-text mb-1">{row.employee.name}</div>
            <div className="td-text-mute">{row.employee.roles_name}</div>
          </div>
        </>
      )
    },
    {
      name: 'Department',
      sortable: true,
      selector : row => row.employee.division_name,
    },
    {
      name : 'Clock In',
      sortable: true,
      selector : row => row.clock_in,
    },
    {
      name : 'Clock Out',
      sortable: true,
      selector : row => row.clock_out,
      cell: row => (
        <div className={row.clock_out !== null ? '' : 'td-text-mute'}>{
          row.clock_out !== null ? row.clock_out : 'On Duty'
        }</div>
      ),
    },
    {
      name: 'Work Places',
      sortable: true,
      selector : row => row.work_places,
      cell : row => {
        if (row.absent_status !== 'Absent') {
          return (
            <span className="badge badge-radius" style={{
              background: row.workplace_badge,
              color: row.workplace_color
            }}>
              {row.workplace_name}
            </span>
          );
        } else {
          return (
            <span className="badge badge-radius" style={{
              background: row.absent_badge,
              color: row.absent_color
            }}>
              {row.absent_status}
            </span>
          );
        }
      },
    },
    {
      name: 'Status',
      sortable: true,
      selector : row => row.status_clock,
      cell: row => (
        <span className="badge badge-radius" style={{
          background: row.absent_badge,
          color: row.absent_color
        }}>
          {row.absent_status}
        </span>
      )
    },
    {
      name: 'Action',
      button: true,
      cell: (row) => (
        <ButtonPermissions 
          scopePermission='Attendance'
          permissionName='attendance-management-detail'
          handleClick={() => viewDetail(row.id)}
        />
      ),
    },
  ]
);

export default columnAttendance;
