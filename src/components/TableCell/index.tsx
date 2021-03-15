import * as React from "react";

//Style
import "./style.css";

export interface TableCellProps {
  children: React.ReactNode;
}

const TableCell: React.SFC<TableCellProps> = ({ children }) => {
  return <div className="TableCell">{children}</div>;
};

export default TableCell;
