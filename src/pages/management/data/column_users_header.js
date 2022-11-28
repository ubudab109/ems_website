import memoize from 'memoize-one';
import DropdownUserAccepted from '../components/DropwdownUserAccepted';
import DropdownUserPending from '../components/DropwdownUserPending';

const columnUsers = memoize(
  (
    onCancel,
    onResend,
    onRemove,
    onChangeRole,
    onView
  ) => [
      {
        name: 'Name',
        sortable: true,
        cell: row => (
          <div className="text-left" style={{ paddingLeft: '29px' }}>
            <img
              className="img-circle"
              src={row.avatar}
              alt=""
              width={30}
              style={{ marginRight: '3px', paddingBottom: '1px' }}
            />
            <span className="text-muted">{row.name}</span>
          </div>
        )
      },
      {
        name: 'Email',
        sortable: true,
        cell: row => (
          <div className="text-left">
            <span className="text-muted">{row.email}</span>
          </div>
        )
      },
      {
        name: 'Role',
        sortable: true,
        cell: row => (
          <div className="text-left">
            <span className="text-muted">{row.role}</span>
          </div>
        )
      },
      {
        name: 'Status',
        sortable: true,
        cell: row => (
          <div className="text-left">
            <span className={row.invited_status === '0' ? 'my-badge-pending' : 'my-badge-success'}>
              {row.invited_status === '0' ? 'Pending' : 'Accepted'}
            </span>
          </div>
        )
      },
      {
        name: 'Action',
        sortable: false,
        cell: row => {
          return (
            <div>
              {
                row.invited_status === '0' ?
                  <DropdownUserPending
                    onCancel={() => onCancel(row.id)}
                    onResend={() => onResend(row.id)}
                  /> :
                  <DropdownUserAccepted
                    onRemove={() => onRemove(row.id)}
                    onChangeRole={
                      () => onChangeRole(
                        row.id,
                        row.roles[0].id,
                        row.role
                      )
                    }
                    onView={
                      () => onView(
                        row.name,
                        row.avatar,
                        row.email,
                        row.role
                      )}
                    isUserSuperadmin={row.role === 'Superadmin' || row.role === 'superadmin' ? true : false}
                  />
              }
            </div>
          );
        }
      },
    ],
);

export default columnUsers;

