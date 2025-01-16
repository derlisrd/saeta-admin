import { Icon, IconButton, InputAdornment, TextField } from "@mui/material";

function InputCantidad() {
  return (
    <TextField
      fullWidth
      autoComplete="off"
      value={1}
      label="Cantidad"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <Icon>remove</Icon>
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
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
