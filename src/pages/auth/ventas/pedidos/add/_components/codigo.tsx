import { CircularProgress, Icon, IconButton, InputAdornment, TextField } from "@mui/material";
import useHook from "../useHook";

function InputCodigo() {
  const { inputCodigoRef, consultarCodigoInsertar, loadingAddProducto } = useHook();
  return (
    <TextField
      placeholder="Código"
      label="Código de producto"
      helperText="Ingrese el código y presione ENTER"
      fullWidth
      inputRef={inputCodigoRef}
      autoComplete="off"
      autoFocus
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          const target = e.target as HTMLInputElement; // Asegurar que e.target es un HTMLInputElement
          consultarCodigoInsertar(target.value);
          target.value = "";
        }
      }}
      slotProps={{
        input: {
          sx: { padding: 0, fontSize: 15 },
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: <InputAdornment position="end">{loadingAddProducto && <CircularProgress size={20} />}</InputAdornment>,
        },
      }}
    />
  );
}

export default InputCodigo;
