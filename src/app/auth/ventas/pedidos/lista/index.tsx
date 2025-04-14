import useListaPedidos from "@/core/hooks/ventas/pedidos/useListaPedidos";
import { ColumnConfigPedidosType } from "@/core/types/columnconfigpedidos";
import { Container, Box, TableContainer, LinearProgress, Stack, Tooltip, IconButton } from "@mui/material";
import { Column, Table, TableCellProps, TableHeaderProps } from "react-virtualized";
import AutoSizer from "react-virtualized-auto-sizer";
import { format } from "@formkit/tempo";
import TableCellHead from "@/components/table/tablecellhead";
import TableCell from "@/components/table/tablecell";
import Icon from "@/components/ui/icon";
import Filtros from "./_components/filtros";

const headerRenderer = ({ label }: TableHeaderProps) => <TableCellHead>{label}</TableCellHead>;
const cellRenderer = ({ cellData }: TableCellProps) => <TableCell>{cellData}</TableCell>;

const getColumnConfig = (width: number): ColumnConfigPedidosType[] => [
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
    cellRenderer: ({ rowData }: TableCellProps) => (
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
function ListaPedidos() {
  const { lista, isLoading, refetch, search, setSearch, buscar } = useListaPedidos();

  const listado = lista?.filter((item) => item?.razon_social.toLowerCase().includes(search.toLowerCase()) || item?.doc.toLowerCase().includes(search.toLowerCase()) || []);

  return (
    <Container>
      <h3>Lista de pedidos</h3>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box>
          <Filtros setSearch={setSearch} buscar={buscar} search={search} refresh={refetch} />
          <TableContainer sx={{ borderRadius: 1, border: 0, boxShadow: 0, minHeight: `calc(100% - 140px)` }}>
            {listado && (
              <AutoSizer>
                {({ height, width }) => (
                  <Table
                    height={height}
                    width={width}
                    rowHeight={48!}
                    headerHeight={48!}
                    rowStyle={{ display: "flex", alignItems: "center" }}
                    rowCount={listado.length}
                    rowGetter={({ index }) => listado[index]}
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
