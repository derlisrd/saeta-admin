import Icon from "@/components/ui/icon";
import { ColumnConfigType } from "@/core/types/columnconfig";
import { IconButton, Stack } from "@mui/material";
import { TableCellProps } from "react-virtualized";

const ColumnClienteTable = (width: number): ColumnConfigType[] => [
    { dataKey: "id", label: "ID", width: width * 0.1 },
    { dataKey: "doc", label: "Doc", width: width * 0.15 },
    { dataKey: "razon_social", label: "Razón social", width: width * 0.3 },
    { dataKey: "telefono", label: "Tel.", width: width * 0.13 },
    {
        dataKey: "extranjero", label: "Extranjero", width: width * 0.13,
        cellRenderer: ({ rowData }: TableCellProps) => (rowData.extranjero === 0 ? 'Nacional' : 'Extranjero'),

    },
    /*   {
      dataKey: "created_at",
      label: "Registro",
      width: width * 0.15,
      cellRenderer: ({ rowData }: TableCellProps) => (rowData.created_at ? format(rowData.created_at, "DD-MM-YY HH:mm") : ""),
    }, */
    {
        dataKey: "_", label: "Acciones", width: width * 0.18,

        cellRenderer: ({ rowData }: TableCellProps) => (
            <Stack direction='row' spacing={1}>
                <IconButton onClick={() => console.log(rowData)}>
                    <Icon name='edit' />
                </IconButton>
            </Stack >
        )
    },
];

export default ColumnClienteTable