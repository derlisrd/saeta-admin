import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import useHook from "../_hooks/useHook";
import { NumericFormat } from "react-number-format";
import Icon from "@/components/ui/icon";

function InputCantidad() {
  const { cantidad, setCantidad } = useHook();

  const menos = () => {
    let nuevaCantidad = cantidad - 1;
    if (nuevaCantidad > 0) {
      setCantidad(nuevaCantidad);
    }
  };

  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
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
                  <Icon name="minus" />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setCantidad(cantidad + 1)}>
                  <Icon name='plus' />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}

export default InputCantidad;
