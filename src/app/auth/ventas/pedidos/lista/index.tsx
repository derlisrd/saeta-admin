import useListaPedidos from "@/core/hooks/ventas/pedidos/useListaPedidos";
import { Container, Box, LinearProgress, Stack, Tooltip, IconButton } from "@mui/material";
import { Column, Table, TableCellProps } from "react-virtualized";
import AutoSizer from "react-virtualized-auto-sizer";
import Filtros from "./_components/filtros";
import { PedidosDelDiaResults } from "@/services/dto/pedidos/pedidosDelDia";
import StyledTableContainer from "@/components/table/styledtable";
import TableHeaderRender from "./_components/tableheaderrender";
import TableCellRender from "./_components/tablecellrender";
import Icon from "@/components/ui/icon";
import { ColumnConfigType } from "@/core/types/columnconfig";
import { format } from "@formkit/tempo";
import { useState } from "react";
import ImprimirModal from "./_modal/imprimir";

function ListaPedidos() {
  const { lista, isLoading, refetch, search, setSearch, buscar, setSelectedRow, selectedRow } = useListaPedidos();
  const [modals, setModals] = useState({
    imprimir: false,
  });

  const listado = lista && lista.filter((item: PedidosDelDiaResults) => item.razon_social.toLowerCase().includes(search.toLowerCase()) || item.doc.includes(search));

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
      cellRenderer: ({ rowData }: TableCellProps) => (
        <Stack direction="row">
          <Tooltip title="Imprimir" placement="left" arrow>
            <IconButton
              onClick={() => {
                setSelectedRow(rowData);
                setModals({ ...modals, imprimir: true });
              }}
            >
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

  return (
    <Container>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box>
          <Filtros setSearch={setSearch} buscar={buscar} search={search} refresh={refetch} />
          <StyledTableContainer sx={{ borderRadius: 1, border: 0, boxShadow: 0, minHeight: `calc(100% - 180px)` }}>
            {listado && (
              <AutoSizer>
                {({ height, width }) => (
                  <Table
                    height={height}
                    width={width}
                    rowHeight={40!}
                    headerHeight={36!}
                    rowStyle={{ display: "flex", alignItems: "center" }}
                    rowCount={listado.length}
                    rowGetter={({ index }) => listado[index]}
                  >
                    {columnConfigRender(width).map((column) => (
                      <Column
                        key={column.dataKey}
                        headerRenderer={TableHeaderRender}
                        cellRenderer={column.cellRenderer || TableCellRender}
                        dataKey={column.dataKey}
                        label={column.label}
                        width={Number(column.width)}
                      />
                    ))}
                  </Table>
                )}
              </AutoSizer>
            )}
          </StyledTableContainer>
        </Box>
      )}
      <ImprimirModal open={modals.imprimir} selectedRow={selectedRow} onClose={() => setModals({ ...modals, imprimir: false })} />
    </Container>
  );
}

export default ListaPedidos;
