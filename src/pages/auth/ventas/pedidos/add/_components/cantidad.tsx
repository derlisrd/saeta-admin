import { Icon, IconButton, InputAdornment, TextField } from "@mui/material";
import useHook from "../useHook";
import { NumericFormat } from "react-number-format";

function InputCantidad() {
  const { cantidad, setCantidad } = useHook();

  const menos = () => {
    let nuevaCantidad = cantidad - 1;
    if (nuevaCantidad > 0) {
      setCantidad(nuevaCantidad);
    }
  };

  return (
    <NumericFormat
      customInput={TextField}
      allowedDecimalSeparators={["%"]}
      value={cantidad}
      thousandSeparator=","
      decimalSeparator="."
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCantidad(Number(e.target.value))}
      fullWidth
      autoComplete="off"
      label="Cantidad"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={menos}>
                <Icon>remove</Icon>
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setCantidad(cantidad + 1)}>
                <Icon>add_circle</Icon>
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default InputCantidad;
