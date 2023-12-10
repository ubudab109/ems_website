import memoize from "memoize-one";
import { ucwords } from "../../../utils/helper";

const columnDataSalary = memoize((viewDetail) => [
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true,
    cell: row => (
      <div className="td-text mb-1"> {row.id} </div>
    )
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
    cell: row => (
      <div className="td-text mb-1"> {row.name} </div>
    )
  },
  {
    name: 'Type',
    selector: row => row.type,
    sortable: true,
    cell: row => (
      <div className="td-text mb-1"> {ucwords(row.type)} </div>
    )
  },
  {
    name: 'Detail',
    sortable: false,
    cell: row => (
      <button type="button" className="btn-detail" onClick={() => viewDetail(row.id)}>Edit</button>
    )
  }
]);

export default columnDataSalary;
