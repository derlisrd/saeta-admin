import {
  Box,
  Button,
  Container,
  LinearProgress,
  Paper,
  Stack,
  Grid2 as Grid,
  TextField,
  InputAdornment,
  Icon,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  IconButton,
  TableFooter,
} from "@mui/material";
import useCategoria from "./useCategoria";

function CategoriaList() {
  const { lista, isLoading, handleModal } = useCategoria();
  return (
    <Container sx={{ paddingBottom: 4 }}>
      <Stack direction={{ xs: "row" }} justifyContent="space-between" alignItems="center" padding={2}>
        <h3>Categorías</h3>
        <Button
          onClick={() => {
            handleModal("crear");
          }}
        >
          Crear nuevo
        </Button>
      </Stack>

      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box boxShadow={6} borderRadius={4} component={Paper} padding={{ xs: 0, sm: 1, md: 2 }}>
          <Grid container padding={2} spacing={{ xs: 1 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>search</Icon>
                      </InputAdornment>
                    ),
                  },
                }}
                placeholder="Buscar..."
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}></Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ borderRadius: 0, border: 0, boxShadow: 0 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>COD.</TableCell>
                  <TableCell>NOMBRE</TableCell>
                  <TableCell>DESC</TableCell>
                  <TableCell>PUBLICADO</TableCell>
                  <TableCell>
                    <span></span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lista &&
                  lista.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.nombre}</TableCell>
                      <TableCell>{item.descripcion}</TableCell>
                      <TableCell>{item.publicado}</TableCell>
                      <TableCell>
                        <IconButton>
                          <Icon>more_vert</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>

              <TableFooter></TableFooter>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
}

export default CategoriaList;
