import Title from "@/core/components/ui/title";
import useAddProducto from "@/core/hooks/productos/add/useAddProducto";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid2 as Grid,
  Icon,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function AddProducto() {
  const {
    form,
    changeByName,
    sendForm,
    loading,
    impuestos,
    categorias,
    depositos,
    medidas,
    addStock,
    stockState,
    success,
    clearSuccess,
    inputCodigoRef,
    verificarCodigoDisponible,
    error,
    generateCode,
    changeStockState,
  } = useAddProducto();
  return (
    <div>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={success.active} autoHideDuration={6000} onClose={clearSuccess}>
        <Alert onClose={clearSuccess} severity="success" variant="filled" sx={{ width: "100%" }}>
          {success.message}
        </Alert>
      </Snackbar>
      <Title>Agregar producto</Title>
      <Box sx={{ paddingBottom: 12 }}>
        {loading && <LinearProgress sx={{ margin: "18px" }} />}
        <Grid container spacing={{ xs: 2, md: 2 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              id="codigo"
              fullWidth
              error={error.code === 1}
              helperText={error.code === 1 ? error.message : ""}
              label="Código"
              autoFocus
              inputRef={inputCodigoRef}
              onBlur={(e) => {
                verificarCodigoDisponible(e.target.value);
              }}
              autoComplete="off"
              placeholder="Código de barras"
              required
              value={form.codigo}
              name="codigo"
              onChange={(e) => changeByName(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button variant="contained" size="large" onClick={generateCode}>
              GENERAR
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormLabel id="tipo">Tipo:</FormLabel>
            <RadioGroup row aria-labelledby="tipo" name="tipo" onChange={(e) => changeByName(e.target.name, Number(e.target.value))}>
              <FormControlLabel value="1" checked={form.tipo === 1} control={<Radio />} label="Producto" />
              <FormControlLabel value="2" checked={form.tipo === 2} control={<Radio />} label="Servicio" />
            </RadioGroup>
          </Grid>
          <Grid size={12}>
            <Typography variant="button">INFORMACION</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              error={error.code === 2}
              helperText={error.code === 2 ? error.message : ""}
              placeholder="Nombre"
              fullWidth
              required
              autoComplete="off"
              label="Nombre"
              name="nombre"
              onChange={(e) => changeByName(e.target.name, e.target.value)}
              value={form.nombre}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField placeholder="Descripción detallada" fullWidth label="Descripción detallada" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth error={error.code === 3}>
              <InputLabel id="impuesto-select-label">Impuesto</InputLabel>
              <Select
                fullWidth
                labelId="impuesto-label"
                id="impuesto"
                onChange={(e) => changeByName(e.target.name, Number(e.target.value))}
                value={form.impuesto_id}
                label="Impuesto"
                name="impuesto_id"
              >
                <MenuItem value={0} disabled>
                  Seleccionar impuesto
                </MenuItem>
                {impuestos.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.descripcion}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>IVA</FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth error={error.code === 4}>
              <InputLabel id="categoria-select-label">Categoría</InputLabel>
              <Select
                fullWidth
                labelId="categorias-label"
                id="Categoria"
                value={form.category_id}
                onChange={(e) => changeByName(e.target.name, Number(e.target.value))}
                label="Categoría"
                name="category_id"
              >
                <MenuItem value={0} disabled>
                  Seleccionar categoria
                </MenuItem>
                {categorias.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.nombre}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Categoría</FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth error={error.code === 5}>
              <InputLabel id="medidas-select-label">Unidad de medida</InputLabel>
              <Select
                fullWidth
                labelId="medidas-label"
                required
                id="Medidas"
                value={form.medida_id}
                onChange={(e) => changeByName(e.target.name, Number(e.target.value))}
                label="Unidad de medida"
                name="medida_id"
              >
                <MenuItem value={0} disabled>
                  Seleccionar medida
                </MenuItem>
                {medidas.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.descripcion}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>c/u</FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <Typography variant="button">VALORES</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              placeholder="Costo"
              name="costo"
              value={form.costo}
              onChange={(e) => changeByName(e.target.name, Number(e.target.value))}
              fullWidth
              required
              label="Costo"
              helperText="Costo del producto"
              error={error.code === 6}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              placeholder="Precio normal"
              name="precio_normal"
              value={form.precio_normal}
              onChange={(e) => changeByName(e.target.name, Number(e.target.value))}
              fullWidth
              required
              label="Precio normal"
              helperText="Precio"
              error={error.code === 7}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              placeholder="Precio mínimo"
              name="precio_minimo"
              value={form.precio_minimo}
              onChange={(e) => changeByName(e.target.name, Number(e.target.value))}
              fullWidth
              required
              label="Precio mínimo"
              helperText="Precio con descuento"
              error={error.code === 8}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField placeholder="Generar precios por %" fullWidth label="Generar precios por %" helperText="Generar precios por %" />
          </Grid>

          <Grid size={12}>
            <Typography variant="button">STOCK</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              placeholder="Cantidad"
              fullWidth
              label="Cantidad"
              name="cantidad"
              value={stockState.cantidad}
              autoComplete="off"
              onChange={({ target }) => {
                changeStockState(target.name, Number(target.value));
              }}
              error={error.code === 9}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth error={error.code === 9}>
              <InputLabel id="deposito-select-label">Deposito</InputLabel>
              <Select
                fullWidth
                labelId="deposito-label"
                id="deposito"
                value={stockState.deposito_id}
                label="Deposito"
                name="deposito_id"
                onChange={({ target }) => {
                  changeStockState(target.name, Number(target.value));
                }}
              >
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
            <Button variant="outlined" size="large" onClick={addStock}>
              AGREGAR
            </Button>
          </Grid>
          <Grid size={12}>
            <List>
              {form.stock.map((e, i) => (
                <ListItem disablePadding key={i}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon>delete</Icon>
                    </ListItemIcon>
                    <ListItemText primary={`Deposito: ${e.deposito}`} secondary={`Cantidad: ${e.cantidad}`} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ position: "fixed", bottom: 24, zIndex: 1000, right: 24 }} bgcolor="background.paper" boxShadow={3} borderRadius={2} p={2}>
        <Stack direction="row" spacing={1}>
          <Button size="large" variant="contained" onClick={sendForm}>
            GUARDAR
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

export default AddProducto;
