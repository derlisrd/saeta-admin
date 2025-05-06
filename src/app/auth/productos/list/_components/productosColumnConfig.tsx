import { ColumnConfigType } from "@/core/types/columnconfig";
import { TableCellProps } from "react-virtualized";
import { format } from "@formkit/tempo";
import { Stack, Tooltip, IconButton } from "@mui/material";
import { ProductoResults } from "@/services/dto/productos/producto";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom"; // Si necesitas la navegación aquí

interface AccionesCellProps extends TableCellProps {
  rowData: ProductoResults;
  onSelectProducto: (producto: ProductoResults) => void;
  // onCancelar: (pedido: PedidosDelDiaResults) => void; // Ejemplo si implementas cancelar
}

const AccionesCell = ({ rowData, onSelectProducto }: AccionesCellProps) => {
  const nav = useNavigate(); // Si la lógica de acciones necesita navegación

  // const handleCancelar = () => {
  //   // Lógica para cancelar el pedido
  //   onCancelar(rowData);
  // };

  return (
    <Stack direction="row">
      <Tooltip title="Código de barra" placement="top" arrow>
        <IconButton onClick={() => onSelectProducto(rowData)}>
          <Icon>printer</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title="Codigo de barra" placement="right" arrow>
        <IconButton onClick={() => nav(`/productos/codigo-barra?codigo=${rowData.id}&precio=${rowData.precio_normal}`)}>
          <Icon>barcode</Icon>
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export const productosColumnConfig = (width: number, onSelectProducto?: (producto: ProductoResults) => void): ColumnConfigType[] => [
  { dataKey: "id", label: "Código", width: width * 0.1 },
  { dataKey: "nombre", label: "Nombre", width: width * 0.2 },
  {
    dataKey: "costo",
    label: "Costo",
    width: width * 0.2,
    cellRenderer: ({ rowData }: TableCellProps) => rowData.costo.toLocaleString("es-PY"),
  },
  {
    dataKey: "precio_normal",
    label: "Precio",
    width: width * 0.2,
    cellRenderer: ({ rowData }: TableCellProps) => rowData.precio_normal.toLocaleString("es-PY"),
  },
  { dataKey: "tipo", label: "Tipo", width: width * 0.1 },
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
    cellRenderer: (props: TableCellProps) => <AccionesCell {...props} onSelectProducto={onSelectProducto || (() => {})} />,
  },
];
