import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import useHook from "../_hooks/useHook";

interface FormasPagosSelectProps {
  error?: boolean;
  selectedFormaPago: number;
  setSelectedFormaPago: (selectedFormaPago: number) => void;
}

function FormaPagoSelect({ error, selectedFormaPago, setSelectedFormaPago }: FormasPagosSelectProps) {
  const { formasPago } = useHook();

  return (
    <FormControl fullWidth error={error}>
      <InputLabel id="formas-select-label">Formas de pago</InputLabel>
      {formasPago && (
        <Select
          fullWidth
          labelId="formas-label"
          id="formas-select"
          value={selectedFormaPago}
          onChange={({ target }) => {
            setSelectedFormaPago(target.value as number);
          }}
          label="Forma de pago"
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
      )}
    </FormControl>
  );
}

export default FormaPagoSelect;
