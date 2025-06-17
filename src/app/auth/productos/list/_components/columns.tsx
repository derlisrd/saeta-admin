import TableHeadRender from "@/components/table/tableHeadRender";
import TableCellRender from "@/components/table/tableCellRender";


import { ColumnConfigType } from "@/core/types/columnconfig";
import { TableCellProps } from "react-virtualized";
import { format } from "@formkit/tempo";
import { Stack, Tooltip, IconButton, Typography } from "@mui/material";
import { ProductoResults } from "@/services/dto/productos/producto";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom"; // Si necesitas la navegación aquí



export const productosColumnConfig = (width: number, onSelectProducto?: (producto: ProductoResults) => void): ColumnConfigType[] => {
    const nav = useNavigate();

    return [
        { dataKey: "codigo", label: "Código", width: width * 0.08 },
        {
            dataKey: "nombre",
            label: "Producto",
            width: width * 0.3,
            cellRenderer: ({ rowData }: TableCellProps) => (
                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton onClick={() => nav(`/productos/details/${rowData.id}`, { state: { producto: rowData } })} >
                        <Icon name="photo" size={22} />
                    </IconButton>
                    <Stack direction="column">
                        <Typography variant="caption">{rowData.nombre}</Typography>
                        <Typography variant="caption">{rowData.precio_normal.toLocaleString("es-PY")}</Typography>
                    </Stack>
                </Stack>
            ),
        },
        {
            dataKey: "stock",
            label: "Stock",
            width: width * 0.1,
            cellRenderer: ({ rowData }: TableCellProps) => <Typography variant="caption">{rowData.cantidad}</Typography>,
        },
        {
            dataKey: "created_at",
            label: "Fecha",
            width: width * 0.18,
            cellRenderer: ({ rowData }: TableCellProps) => (
                <Stack direction="column">
                    <Typography variant="caption">{format(rowData.created_at, "DD-MMM-YY")}</Typography>
                    <Typography variant="caption">{format(rowData.created_at, "HH:mm")}</Typography>
                </Stack>
            ),
        },
        {
            dataKey: "_",
            label: "Acciones",
            width: width * 0.2,
            cellRenderer: ({ rowData }: TableCellProps) => (
                <Stack direction="row">
                    <Tooltip title="Código de barra" placement="top" arrow>
                        <IconButton onClick={() => onSelectProducto?.(rowData)}>
                            <Icon name="printer" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Codigo de barra" placement="right" arrow>
                        <IconButton onClick={() => nav(`/productos/codigo-barra?codigo=${rowData.codigo}&precio=${rowData.precio_normal}`)}>
                            <Icon name="barcode" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar" placement="right" arrow>
                        <IconButton onClick={() => nav(`/productos/edit/${rowData.id}`, { state: rowData })}>
                            <Icon name="edit" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
        },
    ];

}





const columns = (handleSelectProducto: (producto: ProductoResults) => void): ColumnConfigType[] =>
    productosColumnConfig(window.innerWidth, handleSelectProducto).map((config) => ({
        ...config,
        headerRenderer: TableHeadRender,
        cellRenderer: config.cellRenderer || TableCellRender,
    }));

export default columns;
