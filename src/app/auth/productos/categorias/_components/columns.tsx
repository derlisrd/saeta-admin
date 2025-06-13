import TableHeadRender from "@/components/table/tableHeadRender";
import TableCellRender from "@/components/table/tableCellRender";


import { ColumnConfigType } from "@/core/types/columnconfig";
import { TableCellProps } from "react-virtualized";
import { format } from "@formkit/tempo";
import { Stack, Tooltip, IconButton, Typography, Chip } from "@mui/material";

import Icon from "@/components/ui/icon";

const AccionesCell = () => {

    return (
        <Stack direction="row">
            <Tooltip title="Editar" placement="top" arrow>
                <IconButton onClick={() => { }}>
                    <Icon name='edit' />
                </IconButton>
            </Tooltip>
        </Stack>
    );
};

export const productosColumnConfig = (width: number): ColumnConfigType[] => [
    { dataKey: "id", label: "ID", width: width * 0.1 },
    { dataKey: "nombre", label: "Nombre", width: width * 0.2 },
    {
        dataKey: "publicado", label: "Estado", width: width * 0.2,
        cellRenderer: ({ rowData }: TableCellProps) => (
            <Chip label={rowData.publicado === 1 ? "Publicado" : "No publicado"} color={rowData.publicado ? "success" : "error"} />
        ),
    },
    {
        dataKey: "created_at",
        label: "Fecha",
        width: width * 0.18,
        cellRenderer: ({ rowData }: TableCellProps) => (
            <Stack direction='column'>
                <Typography variant="caption">{format(rowData.created_at, "DD-MMM-YY")}</Typography>
                <Typography variant="caption">{format(rowData.created_at, "HH:mm")}</Typography>
            </Stack>
        ),
    },
    {
        dataKey: "_",
        label: "Acciones",
        width: width * 0.2,
        cellRenderer: () => <AccionesCell />,
    },

]





const columns = (): ColumnConfigType[] =>
    productosColumnConfig(window.innerWidth).map((config) => ({
        ...config,
        headerRenderer: TableHeadRender,
        cellRenderer: config.cellRenderer || TableCellRender,
    }));

export default columns;
