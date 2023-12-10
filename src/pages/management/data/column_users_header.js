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
          <div className="td-text mb-1 " style={{ paddingLeft: '0px' }}>
            <img
              className="img-circle"
              src={row.avatar}
              alt=""
              width={30}
              style={{ marginRight: '3px', paddingBottom: '1px' }}
            />
            <span className="">{row.name}</span>
          </div>
        )
      },
      {
        name: 'Email',
        sortable: true,
        cell: row => (
          <div className="td-text mb-1 text-left">
            <span className="">{row.email}</span>
          </div>
        )
      },
      {
        name: 'Role',
        sortable: true,
        cell: row => (
          <div className="td-text mb-1 text-left">
            <span className="">{row.role ?? 'Not Have Any Role'}</span>
          </div>
        )
      },
      {
        name: 'Status',
        sortable: true,
        cell: row => (
          <div className="td-text mb-1 text-left">
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
            <div className='float-right'>
              {
                row.invited_status === '0' ?
                  <DropdownUserPending
                    onCancel={() => onCancel(row.id)}
                    onResend={() => onResend(row.id)}
                  /> :
                  <DropdownUserAccepted
                    currentUserId={row.id}
                    onRemove={() => onRemove(row.id)}
                    onChangeRole={
                      () => onChangeRole(
                        row.id,
                        row.branch_assign[0].pivot.role.id,
                        row.branch_assign[0].pivot.role.name
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

