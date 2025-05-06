// core/config/pedidos/columnConfig.ts
import { ColumnConfigType } from "@/core/types/columnconfig";
import { TableCellProps } from "react-virtualized";
import { format } from "@formkit/tempo";
import { Stack, Tooltip, IconButton } from "@mui/material";
import Icon from "@/components/ui/icon";
import { PedidosDelDiaResults } from "@/services/dto/pedidos/pedidosDelDia";
// import { useNavigate } from "react-router-dom"; // Si necesitas la navegación aquí
const estados = {
  "1": "Pendiente",
  "2": "En Proceso",
  "3": "Entregado",
};

interface AccionesCellProps extends TableCellProps {
  rowData: PedidosDelDiaResults;
  onImprimir: (pedido: PedidosDelDiaResults) => void;
  // onCancelar: (pedido: PedidosDelDiaResults) => void; // Ejemplo si implementas cancelar
}

const AccionesCell = ({ rowData, onImprimir }: AccionesCellProps) => {
  // const nav = useNavigate(); // Si la lógica de acciones necesita navegación

  // const handleCancelar = () => {
  //   // Lógica para cancelar el pedido
  //   onCancelar(rowData);
  // };

  return (
    <Stack direction="row">
      <Tooltip title="Imprimir" placement="left" arrow>
        <IconButton onClick={() => onImprimir(rowData)}>
          <Icon>printer</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title="Cancelar" placement="bottom" arrow>
        <IconButton onClick={() => console.log("Cancelar pedido ID:", rowData.id)}>
          <Icon>x</Icon>
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export const pedidosColumnConfig = (width: number, onImprimir: (pedido: PedidosDelDiaResults) => void): ColumnConfigType[] => [
  { dataKey: "id", label: "ID", width: width * 0.1 },
  { dataKey: "doc", label: "Doc", width: width * 0.1 },
  { dataKey: "razon_social", label: "Cliente", width: width * 0.2 },
  {
    dataKey: "estado",
    label: "Estado",
    width: width * 0.1,
    cellRenderer: ({ rowData }: TableCellProps) => {
      const estado = rowData.estado as keyof typeof estados;
      return estados[estado] || estado;
    },
  },
  { dataKey: "importe_final", label: "Total", width: width * 0.18, cellRenderer: ({ rowData }: TableCellProps) => rowData.importe_final.toLocaleString("es-PY") },
  {
    dataKey: "created_at",
    label: "Fecha",
    width: width * 0.18,
    cellRenderer: ({ rowData }: TableCellProps) => format(rowData.created_at, "DD-MM-YY HH:mm"),
  },
  {
    dataKey: "_",
    label: "Acciones",
    width: width * 0.18,
    cellRenderer: (props: TableCellProps) => <AccionesCell {...props} onImprimir={onImprimir} />,
  },
];
