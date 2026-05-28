import { Table } from "react-bootstrap";
import style from "./tabela.module.css";

const Tabela = ({ columns, rows, keyField }) => {
  const temDados = rows && rows.length > 0;
  return (
    <Table className={style.tabela} responsive hover bordered>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {temDados ? (
          rows.map((row) => 
          <tr key={row[keyField]}>
            {columns.map(column => (
                <td key={column.accessor}>{column.render ? column.render(row) : row[column.accessor]}</td>
            ))}
          </tr>)
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-mute text-center">
              Sem nenhum dado
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default Tabela;
