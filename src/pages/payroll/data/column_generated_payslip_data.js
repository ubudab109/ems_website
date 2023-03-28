import memoize from 'memoize-one';
import { MONTH, MONTH_LIST } from '../../../utils/constant';
import ButtonBlueFilter from '../../../component/ButtonBlueFilter';

const columnGeneratedPayslipData = memoize((retry) => [
  {
    name: 'Generated Month',
    sortable: true,
    selector: row => row.month,
    cell: row => (
      <div className="td-text mb-1">
        {MONTH[row.month - 1]} {row.years}
      </div>
    )
  },
  {
    name: 'Status',
    sortable: true,
    selector: row => row.status,
    cell: row => {
      if (row.status === 'generating') {
        return (
          <div className="td-text mb-1">
            <span className="badge badge-radius" style={{ background: '#FCB756' }}>GENERATING</span>
          </div>
        );
      } else if (row.status === 'generated') {
        return (
          <div className="td-text mb-1">
            <span className="badge badge-radius" style={{ background: '#19C8FF' }}>GENERATED</span>
          </div>
        );
      } else {
        return (
          <div className="td-text mb-1">
            <span className="badge badge-radius" style={{ background: '#FF1111' }}>FAILED</span> <br />
            <button className="mt-2 btn btn-warning" style={{ fontSize: '12px', borderRadius: '4px', color: 'white'}} onClick={() => retry(row.id)} type="button">Retry</button>
          </div>
        );
      }
    }
  },
  {
    name: 'Message',
    sortable: true,
    selector: row => row.message,
    cell: row => (
      <div className="rd-text mb-1">{row.message}</div>
    )
  }
]);

export default columnGeneratedPayslipData;
