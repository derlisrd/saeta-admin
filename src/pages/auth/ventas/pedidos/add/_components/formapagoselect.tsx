import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import useHook from "../useHook";

function FormaPagoSelect() {
  const { pedidos, index, formasPago } = useHook();

  return (
    <FormControl fullWidth>
      <InputLabel id="formas-select-label">Formas de pago</InputLabel>
      <Select fullWidth labelId="formas-label" id="formas-select" onChange={() => {}} value={pedidos[index].formas_pago_id} label="Impuesto" name="impuesto_id">
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
