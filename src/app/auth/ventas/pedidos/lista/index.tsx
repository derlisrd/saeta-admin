import useListaPedidos from "@/core/hooks/ventas/pedidos/useListaPedidos";
import { Container, Box, LinearProgress, Slide } from "@mui/material";
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
  const { lista, isLoading, refetch, search, setSearch, buscar, setSelectedRow, selectedRow, setDesde, setHasta, desde, hasta } = useListaPedidos();

  const [modals, setModals] = useState({
    imprimir: false,
  });

  // Filtrar los datos por texto y fechas
  const listado =
    lista &&
    lista.filter((item: PedidosDelDiaResults) => {
      const matchesSearch = search ? item.razon_social.toLowerCase().includes(search.toLowerCase()) || item.doc.includes(search) : true;

      // Si hay filtro de fechas, verificar que la fecha del pedido está dentro del rango
      if (desde && hasta && item.fecha) {
        const fechaPedido = new Date(item.fecha);
        const fechaDesde = new Date(desde);
        const fechaHasta = new Date(hasta);

        // Ajustar las fechas para comparar solo el día (ignorar la hora)
        fechaDesde.setHours(0, 0, 0, 0);
        fechaHasta.setHours(23, 59, 59, 999);

        return matchesSearch && fechaPedido >= fechaDesde && fechaPedido <= fechaHasta;
      }

      return matchesSearch;
    });

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
          <Filtros setSearch={setSearch} buscar={buscar} search={search} refresh={refetch} setDesde={setDesde} setHasta={setHasta} desde={desde} hasta={hasta} />
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Box>
              <GenericTable data={listado} columns={columns(window.innerWidth)} rowHeight={40} headerHeight={36} />
            </Box>
          </Slide>
        </Box>
      )}
      <ImprimirModal open={modals.imprimir} selectedRow={selectedRow} onClose={() => setModals({ ...modals, imprimir: false })} />
    </Container>
  );
}

export default ListaPedidos;
