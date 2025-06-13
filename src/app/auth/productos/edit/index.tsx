import useEditProductoQuery from "@/core/hooks/productos/edit/useEditProductoQuery";
import { ProductoResults } from "@/services/dto/productos/producto";
import { Box, Container, LinearProgress, Paper, Slide } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import LargeButtonStyled from "@/components/ui/LargeButton";

function EditProducto() {
  const location = useLocation();
  const { id: idStr } = useParams<{ id?: string }>();
  const id = idStr ? parseInt(idStr, 10) : undefined;
  const productoDesdeState = location.state;

  const { isLoading, data: productoDesdeQuery } = useEditProductoQuery(id, !productoDesdeState && !!id);

  const producto: ProductoResults | undefined = productoDesdeState || productoDesdeQuery;
  console.log(producto);

  return (
    <Container>
      <Box sx={{ position: "fixed", bottom: 32, right: 32, zIndex: 100 }}>
        <LargeButtonStyled onClick={() => { }}>Guardar</LargeButtonStyled>
      </Box>

      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box boxShadow={4} component={Paper} mb={6} padding={{ xs: 0, sm: 1, md: 2 }}>
          {isLoading && <LinearProgress sx={{ margin: "18px" }} />}
        </Box>
      </Slide>
    </Container>
  );
}

export default EditProducto;
