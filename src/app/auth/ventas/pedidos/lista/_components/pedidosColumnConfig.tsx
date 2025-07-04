// core/config/pedidos/columnConfig.ts
import { ColumnConfigType } from "@/core/types/columnconfig";
import { TableCellProps } from "react-virtualized";
import { format } from "@formkit/tempo";
import { Stack, Tooltip, IconButton, Chip } from "@mui/material";
import Icon from "@/components/ui/icon";
import { PedidosDelDiaResults } from "@/services/dto/pedidos/pedidosDelDia";
import TableHeadRender from "@/components/table/tableHeadRender";
import TableCellRender from "@/components/table/tableCellRender";

const estados = [
  { title: "Sin estado", color: "info" },
  { title: "Pendiente", color: "warning" },
  { title: "En proceso", color: "info" },
  { title: "Entregado", color: "success" },
  { title: "Cancelado", color: "error" },
] as const;

interface AccionesCellProps extends TableCellProps {
  rowData: PedidosDelDiaResults;
  onImprimir: (pedido: PedidosDelDiaResults) => void;
}

const AccionesCell = ({ rowData, onImprimir }: AccionesCellProps) => (
  <Stack direction="row">
    <Tooltip title="Imprimir" placement="top" arrow>
      <IconButton onClick={() => onImprimir(rowData)}>
        <Icon name='printer' />
      </IconButton>
    </Tooltip>
    <Tooltip title="Cancelar" placement="top" arrow>
      <IconButton onClick={() => console.log("Cancelar pedido ID:", rowData.id)}>
        <Icon name='x' />
      </IconButton>
    </Tooltip>
  </Stack>
);

const buildColumnConfig = (
  width: number,
  onImprimir: (pedido: PedidosDelDiaResults) => void
): ColumnConfigType[] => [
    { dataKey: "id", label: "ID", width: width * 0.06 },
    {
      dataKey: "created_at",
      label: "Fecha",
      width: width * 0.07,
      cellRenderer: ({ rowData }: TableCellProps) => format(rowData.created_at, "DD-MMM-YY"),//HH:mm
    },
    { dataKey: "doc", label: "Doc", width: width * 0.1 },
    {
      dataKey: "razon_social", label: "Cliente", width: width * 0.3,
      cellRenderer: ({ rowData }: TableCellProps) => <p>{rowData.razon_social.substring(0, 28)}</p>
    },
    {
      dataKey: "estado",
      label: "Estado",
      width: width * 0.1,
      cellRenderer: ({ rowData }: TableCellProps) => (
        <Chip
          size="small"
          color={estados[rowData.estado].color}
          label={estados[rowData.estado].title}
        />
      ),
    },
    {
      dataKey: "importe_final",
      label: "Total",
      width: width * 0.1,
      cellRenderer: ({ rowData }: TableCellProps) => (
        <p>{rowData.importe_final.toLocaleString("es-PY")}</p>
      ),
    },
    {
      dataKey: "_",
      label: "Acciones",
      width: width * 0.15,
      cellRenderer: (props: TableCellProps) => <AccionesCell {...props} onImprimir={onImprimir} />,
    },
  ];

export const columnsPedidos = (
  onImprimir: (pedido: PedidosDelDiaResults) => void
): ColumnConfigType[] =>
  buildColumnConfig(window.innerWidth, onImprimir).map((col) => ({
    ...col,
    headerRenderer: TableHeadRender,
    cellRenderer: col.cellRenderer ?? TableCellRender,
  }));
