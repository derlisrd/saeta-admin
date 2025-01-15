import { Icon, IconButton, InputAdornment, TextField } from "@mui/material";
import { useRef } from "react";

interface InputCodigoProps {
  consultarCodigoInsertar: (codigo: string, cantidad: number) => void;
}

function InputCodigo({ consultarCodigoInsertar }: InputCodigoProps) {
  const inputCodigoRef = useRef<HTMLInputElement>(null);
  return (
    <TextField
      placeholder="Código"
      fullWidth
      inputRef={inputCodigoRef}
      autoComplete="off"
      autoFocus
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          const target = e.target as HTMLInputElement; // Asegurar que e.target es un HTMLInputElement
          consultarCodigoInsertar(target.value, 1);
          if (inputCodigoRef.current) {
            inputCodigoRef.current.value = "";
          }
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
        },
      }}
    />
  );
}

export default InputCodigo;
