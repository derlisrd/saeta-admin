import { Container, Slide, Box, LinearProgress } from "@mui/material";
import useCategoria from "./useCategoria";
import GenericTable from "@/components/table/GenericTable";
import columns from "./_components/columns";
import Filtros from "./_components/filtros";
import { useEffect } from "react";
import { showAlert } from "@/core/utils/alert";


function CategoriaList() {
  const { lista, isLoading, error } = useCategoria();

  useEffect(() => {
    if (error) {
      showAlert({
        title: "Error al cargar categorías",
        message: error.message,
        type: "error",
      });
    }
  }, [error]);

  return <Container>

    <Filtros />
    {isLoading ? (
      <LinearProgress />
    ) : (
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box>
          <GenericTable
            data={lista}
            columns={columns()} // Pasa el ancho inicial
            rowHeight={52}
            headerHeight={36}
          />
        </Box>
      </Slide>
    )}
  </Container>
}

export default CategoriaList;
