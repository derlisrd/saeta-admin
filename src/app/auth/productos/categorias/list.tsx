import { Container, Slide, Box, LinearProgress } from "@mui/material";
import useCategoria from "./useCategoria";
import GenericTable from "@/components/table/GenericTable";
import columns from "./_components/columns";
import Filtros from "./_components/filtros";

function CategoriaList() {
  const { lista, isLoading } = useCategoria();
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
