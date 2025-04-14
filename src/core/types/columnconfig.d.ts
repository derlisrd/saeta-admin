import {  TableCellProps } from "react-virtualized";
export interface ColumnConfigType {
    dataKey: string;
    label: string;
    width: number | string;
    cellRenderer?: TableCellProps["cellRenderer"];
  }
  