
import { ColumnConfigType } from "@/core/types/columnconfig";
import TableHeadRender from "@/components/table/tableHeadRender";
import TableCellRender from "@/components/table/tableCellRender";
import { format } from "@formkit/tempo";


const columnsTable = (width: number): ColumnConfigType[] => [
    { dataKey: "id", label: "ID", width: width * 0.1 },
    { dataKey: "cantidad", label: "Cantidad", width: width * 0.2 },
    { dataKey: "precio", label: "Precio", width: width * 0.2,
    cellRenderer: ({ cellData }: { cellData: number }) => {
      return cellData.toLocaleString("es-PY");
    }
     },
    { dataKey: "fecha", label: "Fecha", width: width * 0.2,
   cellRenderer: ({ cellData }: { cellData: string }) => format(cellData, "DD MMM YYYY HH:mm")
     },
]

export const columnsconfig = (): ColumnConfigType[] =>
    columnsTable(window.innerWidth).map((config) => ({
        ...config,
        headerRenderer: TableHeadRender,
        cellRenderer: config.cellRenderer || TableCellRender,
    }));