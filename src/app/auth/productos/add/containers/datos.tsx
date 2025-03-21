import { Fragment } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid2 as Grid,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
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
          <RadioGroup row name="tipo" onChange={(e) => changeByName(e.target.name, Number(e.target.value))}>
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
          <TextField
            placeholder="Descripción detallada"
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
                    <Icon>circle-plus</Icon>
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
            helperText="Precio con descuento"
            error={error.code === 8}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField placeholder="Generar precios por %" fullWidth label="Generar precios por %" helperText="Generar precios por %" />
        </Grid>
        {form.tipo === 1 && <Stock />}
      </Grid>
    </Fragment>
  );
}

export default Datos;
