import { Box, Container, LinearProgress, Slide } from "@mui/material";
import { useListaCreditosContext } from "./provider";
import { useState } from "react";
import GenericTable from "@/components/table/GenericTable";

import Filtros from "./_components/filtros";
import columnsListaCreditos from "./_components/columns";

function MainListaCreditos() {
    const { lista, isLoading, desde, hasta } = useListaCreditosContext();
    const [search, setSearch] = useState("");

    const listado = lista.filter(item => {
        const matchSearch = !search || item.razon_social.toLowerCase().includes(search.toLowerCase()) || item.doc.includes(search);
        if (desde && hasta && item.created_at) {
            const fecha = new Date(item.created_at);
            const inicio = new Date(desde);
            const fin = new Date(hasta);
            inicio.setHours(0, 0, 0, 0);
            fin.setHours(23, 59, 59, 999);
            return matchSearch && fecha >= inicio && fecha <= fin;
        }
        return matchSearch;
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