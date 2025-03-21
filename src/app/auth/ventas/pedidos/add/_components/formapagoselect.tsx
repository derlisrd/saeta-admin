import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import useHook from "../_hooks/useHook";

interface FormasPagosSelectProps {
  error?: boolean;
}

function FormaPagoSelect({ error }: FormasPagosSelectProps) {
  const { pedidos, index, formasPago, changePedido } = useHook();

  return (
    <FormControl fullWidth error={error}>
      <InputLabel id="formas-select-label">Formas de pago</InputLabel>
      <Select fullWidth labelId="formas-label" id="formas-select" onChange={({ target }) => {}} label="Forma de pago" name="formas_pago_id">
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
