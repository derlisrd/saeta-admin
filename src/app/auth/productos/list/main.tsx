import GenericTable from "@/components/table/GenericTable";
import { Box, Container, LinearProgress, Slide } from "@mui/material";

import { useState } from "react";
import { ProductoResults } from "@/services/dto/productos/producto";


import columns from "./_components/columns";
import FiltrosProductos from "./_components/filtros";
import { useProductosLista } from "./provider";


function ListaProductosMain() {

  const { refresh, list, handleModals, setSelectedProducto, isFeching, loading } = useProductosLista()

  const [search, setSearch] = useState("");

  const handleSelectProducto = (producto: ProductoResults) => {
    setSelectedProducto(producto);
    handleModals('codigo')
  };



  const listado = list
    ? list.filter((item: ProductoResults) =>
      item.codigo.toLowerCase().includes(search.toLowerCase()) ||
      item.nombre.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  return (
    <Container>
      <FiltrosProductos
        setSearch={setSearch}
        search={search}
        refresh={refresh}
      />
      {(isFeching || loading) && <LinearProgress sx={{ my: 1 }} />}

      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box>
          <GenericTable
            data={listado}
            columns={columns(handleSelectProducto)} // Pasa el ancho inicial
            rowHeight={52}
            headerHeight={36}
          />
        </Box>
      </Slide>


    </Container>
  );
}

export default ListaProductosMain;
