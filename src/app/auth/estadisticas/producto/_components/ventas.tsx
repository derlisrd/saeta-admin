import GenericTable from "@/components/table/GenericTable";
import { ColumnConfigType } from "@/core/types/columnconfig";
import TableHeadRender from "@/components/table/tableHeadRender";
import TableCellRender from "@/components/table/tableCellRender";
import { EstadisticasProductoVentas } from "@/services/dto/estadisticas/producto";


const columnsTable = (width: number): ColumnConfigType[] => [
    { dataKey: "id", label: "ID", width: width * 0.2 },
    { dataKey: "fecha", label: "Fecha", width: width * 0.2 },
    { dataKey: "cantidad", label: "Cantidad", width: width * 0.2 },
    { dataKey: "precio", label: "Precio", width: width * 0.2 },
]

const columns = (width: number): ColumnConfigType[] =>
    columnsTable(width).map((config) => ({
        ...config,
        headerRenderer: TableHeadRender,
        cellRenderer: config.cellRenderer || TableCellRender,
    }));

function Ventas({ lista }: { lista: EstadisticasProductoVentas[] }) {


    return <GenericTable data={lista} columns={columns(window.innerWidth)} rowHeight={40} headerHeight={36} />

}

export default Ventas;