import TableHeadRender from "@/components/table/tableHeadRender";
import ColumnClienteTable from "./ColumnClienteTable";
import TableCellRender from "@/components/table/tableCellRender";
import { ColumnConfigType } from "@/core/types/columnconfig";

export const columnsconfig = (width: number): ColumnConfigType[] =>
    ColumnClienteTable(width).map((config) => ({
      ...config,
      headerRenderer: TableHeadRender,
      cellRenderer: config.cellRenderer || TableCellRender,
  
    }));