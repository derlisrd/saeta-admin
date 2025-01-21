import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import useHook from "../_hooks/useHook";

function FormaPagoSelect() {
  const { pedidos, index, formasPago, changePedido } = useHook();

  return (
    <FormControl fullWidth>
      <InputLabel id="formas-select-label">Formas de pago</InputLabel>
      <Select
        fullWidth
        labelId="formas-label"
        id="formas-select"
        onChange={({ target }) => {
          changePedido("formas_pago_id", Number(target.value));
        }}
        value={pedidos[index].formas_pago_id}
        label="Impuesto"
        name="formas_pago_id"
      >
        <MenuItem value={0} disabled>
          Seleccionar forma de pago
        </MenuItem>
        {formasPago.map((item, index) => (
          <MenuItem key={index} value={item.id}>
            {item.descripcion}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Formas de pago</FormHelperText>
    </FormControl>
  );
}

export default FormaPagoSelect;
