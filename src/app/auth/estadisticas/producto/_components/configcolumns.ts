
import { ColumnConfigType } from "@/core/types/columnconfig";
import TableHeadRender from "@/components/table/tableHeadRender";
import TableCellRender from "@/components/table/tableCellRender";


const columnsTable = (width: number): ColumnConfigType[] => [
    { dataKey: "id", label: "ID", width: width * 0.2 },
    { dataKey: "fecha", label: "Fecha", width: width * 0.2 },
    { dataKey: "cantidad", label: "Cantidad", width: width * 0.2 },
    { dataKey: "precio", label: "Precio", width: width * 0.2 },
]

export const columns = (width: number): ColumnConfigType[] =>
    columnsTable(width).map((config) => ({
        ...config,
        headerRenderer: TableHeadRender,
        cellRenderer: config.cellRenderer || TableCellRender,
    }));