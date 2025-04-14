import {  TableCellProps } from "react-virtualized";
export interface ColumnConfigPedidosType {
    dataKey: string;
    label: string;
    width: number | string;
    cellRenderer?: TableCellProps["cellRenderer"];
  }
  