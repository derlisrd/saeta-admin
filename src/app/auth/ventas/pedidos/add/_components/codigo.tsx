import { CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material";
import useHook from "../_hooks/useHook";
import Icon from "@/components/ui/icon";
import useModal from "../_hooks/useModal";

function InputCodigo() {
  const { inputCodigoRef, consultarCodigoInsertar, loadingAddProducto } = useHook();
  const { handleModal } = useModal();
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
            <InputAdornment position="end">
              <IconButton onClick={() => handleModal("productos")}>
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: <InputAdornment position="start">{loadingAddProducto && <CircularProgress size={24} />}</InputAdornment>,
        },
      }}
    />
  );
}

export default InputCodigo;
