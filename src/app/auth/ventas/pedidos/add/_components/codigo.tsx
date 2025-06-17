import { Box, CircularProgress, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import useHook from "../_hooks/useHook";
import Icon from "@/components/ui/icon";
import useModal from "../_hooks/useModal";

function InputCodigo() {
  const { inputCodigoRef, consultarCodigoInsertar, loadingAddProducto } = useHook();
  const { handleModal } = useModal();
  return (
    <Box sx={{ display: { xs: "none", md: "block" }, mt: 1 }}>
      <TextField
        placeholder="Código"
        label="Ingrese código y presione ENTER"
        helperText="Presione la lupa para buscar productos"
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
        sx={{
          marginTop: 1,
          "& .MuiInputBase-root": {
            backgroundColor: "background.paper",
            padding: "10px 4px",
          },
        }}
        slotProps={{
          input: {
            sx: { padding: 0 },
            startAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Buscar productos" arrow placement="left">
                  <IconButton onClick={() => handleModal("productos")}>
                    <Icon name="search" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                {loadingAddProducto ? (
                  <CircularProgress size={24} />
                ) : (
                  <Tooltip title="Más vendidos" arrow placement="right">
                    <IconButton onClick={() => handleModal("masvendidos")}>
                      <Icon name='shopping-cart' />
                    </IconButton>
                  </Tooltip>
                )}
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}

export default InputCodigo;
