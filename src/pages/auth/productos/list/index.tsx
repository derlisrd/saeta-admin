import useListProductos from "@/core/hooks/productos/list/useListProductos";
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Icon, Tab, Checkbox, IconButton } from "@mui/material";

function ListaProductos() {
  const { list, loading } = useListProductos();
  return (
    <Container>
      <h3>Productos o servicios</h3>
      <Box>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>COD.</TableCell>
                <TableCell>NOMBRE</TableCell>
                <TableCell>PRECIO</TableCell>
                <TableCell>MINIMO</TableCell>
                <TableCell>
                  <span></span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{item.codigo}</TableCell>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell>{item.precio_normal}</TableCell>
                  <TableCell>{item.precio_minimo}</TableCell>
                  <TableCell>
                    <IconButton>
                      <Icon>more_vert</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default ListaProductos;
