import useListaPedidos from "@/core/hooks/ventas/pedidos/useListaPedidos";
import { Container, Box, LinearProgress } from "@mui/material";
import Filtros from "./_components/filtros";
import { PedidosDelDiaResults } from "@/services/dto/pedidos/pedidosDelDia";
import { useState } from "react";
import ImprimirModal from "./_modal/imprimir";
import GenericTable from "@/components/table/GenericTable";
import { ColumnConfigType } from "@/core/types/columnconfig";
import { pedidosColumnConfig } from "./_components/pedidosColumnConfig";
import TableHeadRender from "@/components/table/tableHeadRender";
import TableCellRender from "@/components/table/tableCellRender";

function ListaPedidos() {
  const { lista, isLoading, refetch, search, setSearch, buscar, setSelectedRow, selectedRow, setDesde, setHasta } = useListaPedidos();
  const [modals, setModals] = useState({
    imprimir: false,
  });

  const listado = lista && lista.filter((item: PedidosDelDiaResults) => item.razon_social.toLowerCase().includes(search.toLowerCase()) || item.doc.includes(search));

  const handleImprimir = (pedido: PedidosDelDiaResults) => {
    setSelectedRow(pedido);
    setModals({ ...modals, imprimir: true });
  };
  const columns = (width: number): ColumnConfigType[] =>
    pedidosColumnConfig(width, handleImprimir).map((config) => ({
      ...config,
      headerRenderer: TableHeadRender,
      cellRenderer: config.cellRenderer || TableCellRender,
    }));

  return (
    <Container>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box>
          <Filtros setSearch={setSearch} buscar={buscar} search={search} refresh={refetch} setDesde={setDesde} setHasta={setHasta} />
          <Box>
            <GenericTable
              data={listado}
              columns={columns(window.innerWidth)} // Pasa el ancho inicial
              rowHeight={40}
              headerHeight={36}
            />
          </Box>
        </Box>
      )}
      <ImprimirModal open={modals.imprimir} selectedRow={selectedRow} onClose={() => setModals({ ...modals, imprimir: false })} />
    </Container>
  );
}

export default ListaPedidos;
