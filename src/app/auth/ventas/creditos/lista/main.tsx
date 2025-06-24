import { Box, Container, LinearProgress, Slide } from "@mui/material";
import { useListaCreditosContext } from "./provider";
import { useState } from "react";
import { CreditosResults } from "@/services/dto/pedidos/creditos";
import GenericTable from "@/components/table/GenericTable";

import Filtros from "./_components/filtros";
import columnsListaCreditos from "./_components/columns";

function MainListaCreditos() {
    const { lista, isLoading, desde, hasta } = useListaCreditosContext();
    const [search, setSearch] = useState("");

    const listado =
        lista &&
        lista.filter((item: CreditosResults) => {
            const matchesSearch = search ? item.razon_social.toLowerCase().includes(search.toLowerCase()) || item.doc.includes(search) : true;

            // Si hay filtro de fechas, verificar que la fecha del pedido está dentro del rango
            if (desde && hasta && item.created_at) {
                const fechaCredito = new Date(item.created_at);
                const fechaDesde = new Date(desde);
                const fechaHasta = new Date(hasta);

                // Ajustar las fechas para comparar solo el día (ignorar la hora)
                fechaDesde.setHours(0, 0, 0, 0);
                fechaHasta.setHours(23, 59, 59, 999);

                return matchesSearch && fechaCredito >= fechaDesde && fechaCredito <= fechaHasta;
            }

            return matchesSearch;
        });


    return <Container>
        {isLoading ? (
            <LinearProgress />
        ) : (
            <Box>
                <Filtros setSearch={setSearch} search={search} />
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                    <Box>
                        <GenericTable data={listado} columns={columnsListaCreditos()} rowHeight={40} headerHeight={36} />
                    </Box>
                </Slide>
            </Box>
        )}
    </Container>
}

export default MainListaCreditos;