import { TextField, Grid2 as Grid, Typography, Select, FormControl, InputLabel, MenuItem, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import useAddProducto from "../_hook/useAddProducto";
import Icon from "@/components/ui/icon";
import { NumericFormat } from "react-number-format";

function Stock() {
  const { form, depositos, addStock, stockState, error, changeStockState } = useAddProducto();
  return (
    <>
      <Grid size={12}>
        <Typography variant="button">STOCK</Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <NumericFormat
          autoComplete="off"
          customInput={TextField}
          thousandSeparator="."
          decimalSeparator=","
          placeholder="Cantidad"
          name="cantidad"
          value={stockState.cantidad ? stockState.cantidad : ""}
          onValueChange={(e) => {
            changeStockState("cantidad", Number(e.value));
          }}
          fullWidth
          label="Cantidad"
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
        <Button variant="outlined" endIcon={<Icon size={14}>basket-plus</Icon>} onClick={addStock}>
          AGREGAR
        </Button>
      </Grid>
      <Grid size={12}>
        <List>
          {form.stock.map((e, i) => (
            <ListItem disablePadding key={i}>
              <ListItemButton>
                <ListItemIcon>
                  <Icon>trash</Icon>
                </ListItemIcon>
                <ListItemText primary={`Deposito: ${e.deposito}`} secondary={`Cantidad: ${e.cantidad}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  );
}

export default Stock;
