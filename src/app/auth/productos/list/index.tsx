import GenericTable from "@/components/table/GenericTable";
import TableCellRender from "@/components/table/tableCellRender";
import useListProductos from "@/core/hooks/productos/list/useListProductos";
import { ColumnConfigType } from "@/core/types/columnconfig";
import { Box, Button, Container, InputAdornment, LinearProgress, Stack, TextField } from "@mui/material";

import { productosColumnConfig } from "./_components/productosColumnConfig";
import TableHeadRender from "@/components/table/tableHeadRender";
import PrintCodigoModal from "./_modal/codigo";
import { useState } from "react";
import { ProductoResults } from "@/services/dto/productos/producto";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

function ListaProductos() {
  const nav = useNavigate();
  const { list, loading, setSelectedProducto, selectedProducto } = useListProductos();
  const [modalOpen, setModalOpen] = useState({ codigo: false, imagenes: false });
  const [search, setSearch] = useState("");

  const handleSelectProducto = (producto: ProductoResults) => {
    setSelectedProducto(producto);
    setModalOpen({ codigo: true, imagenes: false });
  };

  const handleCloseModal = () => {
    setModalOpen({ codigo: false, imagenes: false });
  };

  const columns = (width: number): ColumnConfigType[] =>
    productosColumnConfig(width, handleSelectProducto).map((config) => ({
      ...config,
      headerRenderer: TableHeadRender,
      cellRenderer: config.cellRenderer || TableCellRender,
    }));

  const listado = list ? list.filter((item: ProductoResults) => item.codigo.toLowerCase().includes(search.toLowerCase()) || item.nombre.includes(search)) : [];

  return (
    <Container sx={{ paddingBottom: 6 }}>
      <Stack spacing={2} my={2} direction="row">
        <TextField
          label="Buscar"
          placeholder="Nombre o codigo"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              ),
            },
          }}
          onChange={({ target }) => setSearch(target.value)}
        />
        <Button size="small" startIcon={<Icon>plus</Icon>} onClick={() => nav("/productos/add")}>
          Registrar
        </Button>
      </Stack>
      {loading ? (
        <LinearProgress />
      ) : (
        <Box>
          <GenericTable
            data={listado}
            columns={columns(window.innerWidth)} // Pasa el ancho inicial
            rowHeight={40}
            headerHeight={36}
          />
        </Box>
      )}
      <PrintCodigoModal open={modalOpen.codigo} onClose={handleCloseModal} selectedProducto={selectedProducto} />
    </Container>
  );
}

export default ListaProductos;
