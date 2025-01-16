import { CircularProgress, Icon, IconButton, InputAdornment, TextField } from "@mui/material";
import { Ref } from "react";

interface InputCodigoProps {
  consultarCodigoInsertar: (codigo: string, cantidad: number) => void;
  loading: boolean;
  ref?: Ref<HTMLInputElement>;
}

function InputCodigo({ consultarCodigoInsertar, ref, loading }: InputCodigoProps) {
  return (
    <TextField
      placeholder="Código"
      fullWidth
      inputRef={ref}
      autoComplete="off"
      autoFocus
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          const target = e.target as HTMLInputElement; // Asegurar que e.target es un HTMLInputElement
          consultarCodigoInsertar(target.value, 1);
          target.value = "";
        }
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: <InputAdornment position="end">{loading && <CircularProgress size={20} />}</InputAdornment>,
        },
      }}
    />
  );
}

export default InputCodigo;
