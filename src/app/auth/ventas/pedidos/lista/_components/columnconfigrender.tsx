import { format } from "@formkit/tempo";
import Icon from "@/components/ui/icon";
import { ColumnConfigType } from "@/core/types/columnconfig";
import { Stack, Tooltip, IconButton } from "@mui/material";
import { TableCellProps } from "react-virtualized";

const columnConfigRender = (width: number): ColumnConfigType[] => [
  { dataKey: "id", label: "ID", width: width * 0.1 },
  { dataKey: "doc", label: "Doc", width: width * 0.1 },
  { dataKey: "razon_social", label: "Cliente", width: width * 0.2 },
  { dataKey: "estado", label: "Estado", width: width * 0.1 },
  { dataKey: "total", label: "Total", width: width * 0.18 },
  { dataKey: "created_at", label: "Fecha", width: width * 0.18, cellRenderer: ({ rowData }: TableCellProps) => format(rowData.created_at, "DD-MM-YY HH:mm") },
  {
    dataKey: "_",
    label: "Acciones",
    width: width * 0.18,
    cellRenderer: (/* { rowData }: TableCellProps */) => (
      <Stack direction="row">
        <Tooltip title="Imprimir" placement="left" arrow>
          <IconButton onClick={() => console.log("Imprimir")}>
            <Icon>printer</Icon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancelar" placement="bottom" arrow>
          <IconButton onClick={() => console.log("Imprimir")}>
            <Icon>x</Icon>
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  },
];

export default columnConfigRender;
