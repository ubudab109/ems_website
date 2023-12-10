import memoize from 'memoize-one';
import ButtonNotPermissions from '../../../../component/ButtonNotPermissions';

const branchData = memoize((viewDetail) => [
  {
    name: 'Branch Code',
    sortable: true,
    selector: row => row.branch_code,
    cell: row => {
      return (
        <div className="td-text mb-1" style={{ paddingLeft: '0px'}}>
          <span>{row.branch_code}</span>
        </div>
      )
    }
  },
  {
    name: 'Branch Name',
    sortable: true,
    selector: row => row.branch_name,
    cell: row => {
      return (
        <div className="td-text mb-1" style={{ paddingLeft: '0px'}}>
          <span>{row.branch_name}</span>
        </div>
      )
    }
  },
  {
    name: 'Address',
    sortable: true,
    selector: row => row.address,
    cell: row => {
      return (
        <div className="td-text mb-1" style={{ paddingLeft: '0px'}}>
          <span>{row.address}</span>
        </div>
      )
    }
  },
  {
    name: 'Is Center',
    sortable: true,
    selector: row => row.is_centered,
    cell: row => {
      if (row.is_centered) {
        return (
          <div className="td-text mb-1" style={{ paddingLeft: '0px'}}>
            <span>Center</span>
          </div>
        );
      } else {
        return (
          <div className="td-text mb-1" style={{ paddingLeft: '0px'}}>
            <span>Not Center</span>
          </div>
        );
      }
    }
  },
  {
    name: 'Work Type',
    sortable: true,
    selector: row => row.work_type,
    cell: row => {
      return (
        <div className="td-text mb-1" style={{ paddingLeft: '0px'}}>
          <span>{row.work_type.toUpperCase()}</span>
        </div>
      )
    }
  },
  {
    name: 'Detail',
    sortable: false,
    cell: row => {
      return (
        <ButtonNotPermissions 
          handleClick={() => viewDetail(row.id)}
        />
      )
    }
  },
]);

export default branchData;
