import GenericTable from "@/components/table/GenericTable";
import TableCellRender from "@/components/table/tableCellRender";
import useListProductos from "@/core/hooks/productos/list/useListProductos";
import { ColumnConfigType } from "@/core/types/columnconfig";
import { Box, Container, LinearProgress } from "@mui/material";

import { productosColumnConfig } from "./_components/productosColumnConfig";
import TableHeadRender from "@/components/table/tableHeadRender";
import PrintCodigoModal from "./_modal/codigo";
import { useState } from "react";
import { ProductoResults } from "@/services/dto/productos/producto";

function ListaProductos() {
  const { list, loading, setSelectedProducto, selectedProducto } = useListProductos();
  const [modalOpen, setModalOpen] = useState({ codigo: false, imagenes: false });

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

  return (
    <Container sx={{ paddingBottom: 6 }}>
      {loading ? (
        <LinearProgress />
      ) : (
        <Box>
          <GenericTable
            data={list}
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
