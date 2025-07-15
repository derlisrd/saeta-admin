import { Fragment } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useAddProducto from "../_hook/useAddProducto";
import { NumericFormat } from "react-number-format";
import Stock from "./stock";
import Icon from "@/components/ui/icon";

function Datos() {
  const { form, handleModal, changeByName, impuestos, categorias, medidas, inputCodigoRef, verificarCodigoDisponible, error, generateCode } = useAddProducto();
  return (
    <Fragment>
      <Grid container spacing={{ xs: 2 }} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name='barcode' />
                  </InputAdornment>
                )
              }
            }}
            id="codigo"
            fullWidth
            error={error.code === 1}
            helperText={error.code === 1 ? error.message : ""}
            label="Código de barras"
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
        <Grid size={{ xs: 12, md: 6 }}>
          <Button variant="contained" endIcon={<Icon name='arrows-random' />} onClick={generateCode}>
            GENERAR
          </Button>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FormLabel id="tipo">Seleccione tipo:</FormLabel>
            <FormControlLabel
              value="1"
              checked={form.tipo === 1}
              onChange={() => changeByName("tipo", 1)}
              control={<Checkbox icon={<Icon name='circle-dashed' />} checkedIcon={<Icon name='circle-check' />} />}
              label="Producto"
            />
            <FormControlLabel
              value="2"
              checked={form.tipo === 2}
              onChange={() => changeByName("tipo", 2)}
              control={<Checkbox icon={<Icon name='circle-dashed' />} checkedIcon={<Icon name='circle-check' />} />}
              label="Servicio"
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>

          <FormControlLabel
            value="1"
            checked={form.disponible === 1}
            onChange={() => changeByName("disponible", form.disponible === 1 ? 0 : 1)}
            control={<Checkbox icon={<Icon name='circle-dashed' />} checkedIcon={<Icon name='circle-check' />} />}
            label="Mostrar en tienda virtual"
          />
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
          <TextField
            placeholder="Descripción detallada del producto"
            fullWidth
            value={form.descripcion}
            label="Descripción detallada"
            name="descripcion"
            onChange={(e) => changeByName(e.target.name, e.target.value)}
          />
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
              <List>
                <ListItemButton onClick={() => handleModal("categorias")}>
                  <ListItemIcon>
                    <Icon name='circle-plus' />
                  </ListItemIcon>
                  <ListItemText primary="Agregar categoria" />
                </ListItemButton>
              </List>
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
          <NumericFormat
            customInput={TextField}
            thousandSeparator="."
            decimalSeparator=","
            placeholder="Costo"
            name="costo"
            value={form.costo}
            onValueChange={(e) => {
              changeByName("costo", Number(e.value));
            }}
            fullWidth
            required
            label="Costo"
            helperText="Costo del producto"
            error={error.code === 6}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <NumericFormat
            customInput={TextField}
            thousandSeparator="."
            decimalSeparator=","
            placeholder="Precio normal"
            name="precio_normal"
            value={form.precio_normal}
            onValueChange={(e) => {
              changeByName("precio_normal", Number(e.value));
            }}
            fullWidth
            required
            label="Precio normal"
            helperText="Precio"
            error={error.code === 7}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <NumericFormat
            customInput={TextField}
            thousandSeparator="."
            decimalSeparator=","
            placeholder="Precio mínimo"
            name="precio_minimo"
            value={form.precio_minimo}
            onValueChange={(e) => {
              changeByName("precio_minimo", Number(e.value));
            }}
            fullWidth
            required
            label="Precio mínimo"
            helperText="Precio mínimo"
            error={error.code === 8}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <NumericFormat
            customInput={TextField}
            thousandSeparator="."
            decimalSeparator=","
            placeholder="Precio promocional"
            name="precio_descuento"
            value={form.precio_descuento}
            onValueChange={(e) => {
              changeByName("precio_descuento", Number(e.value));
            }}
            fullWidth
            label="Si tiene promoción"
            helperText="Precio con promoción"
            error={error.code === 8}
          />
        </Grid>
        {form.tipo === 1 && <Stock />}
      </Grid>
    </Fragment>
  );
}

export default Datos;
