import GenericTable from "@/components/table/GenericTable";
import TableCellRender from "@/components/table/tableCellRender";
import useListProductos from "@/core/hooks/productos/list/useListProductos";
import { ColumnConfigType } from "@/core/types/columnconfig";
import { Box, Container, LinearProgress } from "@mui/material";

import { productosColumnConfig } from "./_components/productosColumnConfig";
import TableHeadRender from "@/components/table/tableHeadRender";

function ListaProductos() {
  const { list, loading } = useListProductos();

  const columns = (width: number): ColumnConfigType[] =>
    productosColumnConfig(width).map((config) => ({
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
    </Container>
  );
}

export default ListaProductos;
