import useListaPedidos from "@/core/hooks/ventas/pedidos/useListaPedidos";
import { ColumnConfigPedidosType } from "@/core/types/columnconfigpedidos";
import { Container, Box, Paper, TableContainer, LinearProgress } from "@mui/material";
import { Column, Table, TableCellProps, TableHeaderProps } from "react-virtualized";
import AutoSizer from "react-virtualized-auto-sizer";
import { format } from "@formkit/tempo";

const TableCellHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        cursor: "pointer",
        height: 48,
        bgcolor: "primary.main",
        color: "white",
        paddingLeft: 1,
      }}
    >
      {children}
    </Box>
  );
};

const TableCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        height: 48,
        fontSize: 13,
        paddingLeft: 1,
      }}
    >
      {children}
    </Box>
  );
};

const headerRenderer = ({ label }: TableHeaderProps) => <TableCellHead>{label}</TableCellHead>;
const cellRenderer = ({ cellData }: TableCellProps) => <TableCell>{cellData}</TableCell>;

const getColumnConfig = (width: number): ColumnConfigPedidosType[] => [
  { dataKey: "id", label: "ID", width: width * 0.1 },
  { dataKey: "doc", label: "Doc", width: width * 0.1 },
  { dataKey: "razon_social", label: "Cliente", width: width * 0.2 },
  { dataKey: "estado", label: "Estado", width: width * 0.1 },
  { dataKey: "total", label: "Total", width: width * 0.18 },
  { dataKey: "created_at", label: "Fecha", width: width * 0.18, cellRenderer: ({ rowData }: TableCellProps) => format(rowData.created_at, "DD-MM-YY HH:mm") },
  { dataKey: "_", label: "Acciones", width: width * 0.18 },
];
function ListaPedidos() {
  const { lista, isLoading } = useListaPedidos();

  return (
    <Container>
      <h3>Lista de pedidos</h3>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box boxShadow={3} borderRadius={4} component={Paper}>
          <TableContainer component={Paper} sx={{ borderRadius: 1, border: 0, boxShadow: 0, minHeight: `calc(100% - 140px)` }}>
            {lista && (
              <AutoSizer>
                {({ height, width }) => (
                  <Table
                    height={height}
                    width={width}
                    rowHeight={48!}
                    headerHeight={48!}
                    rowStyle={{ display: "flex", alignItems: "center" }}
                    rowCount={lista.length}
                    rowGetter={({ index }) => lista[index]}
                  >
                    {getColumnConfig(width).map((column) => (
                      <Column
                        key={column.dataKey}
                        headerRenderer={headerRenderer}
                        cellRenderer={column.cellRenderer || cellRenderer}
                        dataKey={column.dataKey}
                        label={column.label}
                        width={Number(column.width)}
                      />
                    ))}
                  </Table>
                )}
              </AutoSizer>
            )}
          </TableContainer>
        </Box>
      )}
    </Container>
  );
}

export default ListaPedidos;
