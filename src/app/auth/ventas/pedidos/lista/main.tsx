
import { Container, Box, LinearProgress, Slide } from "@mui/material";
import Filtros from "./_components/filtros";
import { PedidosDelDiaResults } from "@/services/dto/pedidos/pedidosDelDia";

import ImprimirModal from "./_modal/imprimir";
import GenericTable from "@/components/table/GenericTable";
import { columnsPedidos } from "./_components/pedidosColumnConfig";
import { useListaPedidosContext } from "./provider";
import { useState } from "react";



function ListaPedidosMain() {
    const { lista, isLoading, setSelectedRow, selectedRow, desde, hasta, handleModals, modals } = useListaPedidosContext();

    const [search, setSearch] = useState("");

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
        handleModals("imprimir");
    };



    return (
        <Container>
            {isLoading ? (
                <LinearProgress />
            ) : (
                <Box>
                    <Filtros setSearch={setSearch} search={search} />
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                        <Box>
                            <GenericTable data={listado} columns={columnsPedidos(handleImprimir)} rowHeight={40} headerHeight={36} />
                        </Box>
                    </Slide>
                </Box>
            )}
            <ImprimirModal open={modals.imprimir} selectedRow={selectedRow} onClose={() => handleModals("imprimir")} />
        </Container>
    );
}

export default ListaPedidosMain;
