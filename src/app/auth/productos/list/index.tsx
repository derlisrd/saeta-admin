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
  TableFooter,
  Stack,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ListaProductos() {
  const { list, loading, depositos, selectDeposito, setSelectDeposito } = useListProductos();
  const navigate = useNavigate();
  return (
    <Container sx={{ paddingBottom: 6 }}>
      <Stack direction={{ xs: "row" }} justifyContent="space-between" alignItems="center" padding={2}>
        <h3>Productos</h3>
        <Button onClick={() => navigate("/productos/add")}>Agregar nuevo</Button>
      </Stack>

      {loading ? (
        <LinearProgress />
      ) : (
        <Box boxShadow={6} borderRadius={4} component={Paper} py={{ xs: 0, sm: 1, md: 2 }}>
          <Grid container padding={2} spacing={{ xs: 1 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Deposito</InputLabel>
                <Select
                  fullWidth
                  displayEmpty
                  value={selectDeposito}
                  label="Deposito"
                  onChange={({ target }) => {
                    setSelectDeposito(Number(target.value));
                  }}
                >
                  <MenuItem value={0} disabled>
                    Seleccionar deposito
                  </MenuItem>
                  {depositos.map((item, i) => (
                    <MenuItem key={i} value={item.id}>
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
          <TableContainer component={Paper} sx={{ borderRadius: 0, border: 0, boxShadow: 0 }}>
            <Table stickyHeader aria-label="sticky table">
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

              <TableFooter></TableFooter>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
}

export default ListaProductos;
