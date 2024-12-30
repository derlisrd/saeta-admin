import BoxShadow from "@/core/components/ui/boxshadow";
import Title from "@/core/components/ui/title";
import useAddProducto from "@/core/hooks/productos/add/useAddProducto";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid2 as Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";

function AddProducto() {
  const { form, changeByName } = useAddProducto();
  console.log(form);
  return (
    <div>
      <BoxShadow>
        <Title>Agregar producto</Title>
        <Box sx={{ paddingBottom: 12 }}>
          <Grid container spacing={{ xs: 2, md: 2 }} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Código" autoFocus placeholder="Código de barras" required />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Button variant="contained" size="large">
                GENERAR
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormLabel id="tipo">Tipo:</FormLabel>
              <RadioGroup row aria-labelledby="tipo" name="row-radio-buttons-group">
                <FormControlLabel value="1" control={<Radio />} label="Producto" />
                <FormControlLabel value="2" control={<Radio />} label="Servicio" />
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
                <InputLabel id="demo-simple-select-label">Impuesto</InputLabel>
                <Select fullWidth labelId="impuesto-label" id="impuesto" value={10} label="Impuesto">
                  <MenuItem value={0}>Exenta</MenuItem>
                  <MenuItem value={5}>IVA 5%</MenuItem>
                  <MenuItem value={10}>IVA 10%</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                <Select fullWidth labelId="impuesto-label" id="Categoría" value={10} label="Categoría">
                  <MenuItem value={0}>Exenta</MenuItem>
                  <MenuItem value={5}>IVA 5%</MenuItem>
                  <MenuItem value={10}>IVA 10%</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                <Select fullWidth labelId="impuesto-label" id="Categoría" value={10} label="Categoría">
                  <MenuItem value={0}>Exenta</MenuItem>
                  <MenuItem value={5}>IVA 5%</MenuItem>
                  <MenuItem value={10}>IVA 10%</MenuItem>
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
              <TextField placeholder="Cantidad" fullWidth label="Cantidad" autoComplete="off" />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Deposito</InputLabel>
                <Select fullWidth labelId="impuesto-label" id="Categoría" value={10} label="Deposito">
                  <MenuItem value={0}>Exenta</MenuItem>
                  <MenuItem value={5}>IVA 5%</MenuItem>
                  <MenuItem value={10}>IVA 10%</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Button variant="outlined" size="large">
                AGREGAR
              </Button>
            </Grid>
          </Grid>
        </Box>
      </BoxShadow>

      <Box sx={{ position: "absolute", bottom: 18, zIndex: 1000, right: 18 }} bgcolor="background.paper" boxShadow={3} borderRadius={2} p={2}>
        <Stack direction="row" spacing={1}>
          <Button size="large" variant="outlined">
            GUARDAR
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

export default AddProducto;
