import Title from "@/core/components/ui/title";
import useAddProducto from "@/core/hooks/productos/add/useAddProducto";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2 as Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function AddProducto() {
  const { form, changeByName, sendForm, loading, setForm, impuestos, categorias, depositos, medidas, addStock, stockState, setStockState } = useAddProducto();

  return (
    <div>
      <Title>Agregar producto</Title>
      <Box sx={{ paddingBottom: 12 }}>
        {loading && <LinearProgress sx={{ margin: "18px" }} />}
        <Grid container spacing={{ xs: 2, md: 2 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label="Código" autoFocus placeholder="Código de barras" required name="codigo" onChange={changeByName} />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button variant="contained" size="large">
              GENERAR
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormLabel id="tipo">Tipo:</FormLabel>
            <RadioGroup row aria-labelledby="tipo" name="tipo" onChange={(e) => setForm({ ...form, tipo: Number(e.target.value) })}>
              <FormControlLabel value="1" checked={form.tipo === 1} control={<Radio />} label="Producto" />
              <FormControlLabel value="2" checked={form.tipo === 2} control={<Radio />} label="Servicio" />
            </RadioGroup>
          </Grid>
          <Grid size={12}>
            <Typography variant="button">INFORMACION</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField placeholder="Nombre" fullWidth required label="Nombre" name="nombre" onChange={changeByName} value={form.nombre} />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField placeholder="Descripción detallada" fullWidth label="Descripción detallada" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="impuesto-select-label">Impuesto</InputLabel>
              <Select
                fullWidth
                labelId="impuesto-label"
                id="impuesto"
                onChange={(e) => setForm({ ...form, impuesto_id: Number(e.target.value) })}
                value={form.impuesto_id}
                label="Impuesto"
                name="impuesto_id"
              >
                <MenuItem value={0}>Sin información</MenuItem>
                {impuestos.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="categoria-select-label">Categoría</InputLabel>
              <Select
                fullWidth
                labelId="categorias-label"
                id="Categoria"
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}
                label="Categoría"
                name="category_id"
              >
                <MenuItem value={0}>Sin información</MenuItem>
                {categorias.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="medidas-select-label">Unidad de medida</InputLabel>
              <Select
                fullWidth
                labelId="medidas-label"
                id="Medidas"
                value={form.medida_id}
                onChange={(e) => setForm({ ...form, medida_id: Number(e.target.value) })}
                label="Unidad de medida"
                name="medida_id"
              >
                <MenuItem value={0}>Sin información</MenuItem>
                {medidas.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <Typography variant="button">VALORES</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField placeholder="Costo" fullWidth required label="Costo" helperText="Costo del producto" />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField placeholder="Precio normal" fullWidth required label="Precio normal" helperText="Precio" />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField placeholder="Precio mínimo" fullWidth required label="Precio mínimo" helperText="Precio con descuento" />
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
              onChange={(e) => {
                setStockState({ ...stockState, cantidad: Number(e.target.value) });
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="deposito-select-label">Deposito</InputLabel>
              <Select
                fullWidth
                labelId="deposito-label"
                id="deposito"
                value={stockState.deposito_id}
                label="Deposito"
                name="deposito_id"
                onChange={(e) => {
                  setStockState({ ...stockState, deposito_id: Number(e.target.value) });
                }}
              >
                <MenuItem value={0}>Sin información</MenuItem>
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
            {form.stock.length > 0 && (
              <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2 }}>
                <Grid container spacing={2}>
                  {form.stock.map((item, index) => (
                    <Grid key={index} size={{ xs: 12, md: 6 }}>
                      <Typography>{depositos.find((dep) => dep.id === item.deposito_id)?.nombre}</Typography>
                      <Typography>{item.cantidad}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ position: "fixed", bottom: 24, zIndex: 1000, right: 24 }} bgcolor="background.paper" boxShadow={3} borderRadius={2} p={2}>
        <Stack direction="row" spacing={1}>
          <Button size="large" variant="outlined" onClick={sendForm}>
            GUARDAR
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

export default AddProducto;
