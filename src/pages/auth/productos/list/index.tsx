import useListProductos from "@/core/hooks/productos/list/useListProductos";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Icon,
  Checkbox,
  IconButton,
  LinearProgress,
  Paper,
  Grid2 as Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function ListaProductos() {
  const { list, loading, depositos } = useListProductos();
  return (
    <Container>
      <h3>Productos o servicios</h3>
      {loading ? (
        <LinearProgress />
      ) : (
        <Box boxShadow={6} borderRadius={3}>
          <Grid container padding={2} spacing={{ xs: 1 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="deposito-select-label">Deposito</InputLabel>
                <Select fullWidth labelId="deposito-label" id="deposito" label="Deposito" name="deposito_id" onChange={({ target }) => {}}>
                  <MenuItem value={0} disabled>
                    Seleccionar deposito
                  </MenuItem>
                  {depositos.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
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
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
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
      )}
    </Container>
  );
}

export default ListaProductos;
