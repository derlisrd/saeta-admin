import { Icon, IconButton, InputAdornment, TextField } from "@mui/material";
import { Ref, Dispatch, SetStateAction } from "react";

interface InputCantidadProps {
  ref?: Ref<HTMLInputElement>;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

function InputCantidad({ ref, value, setValue }: InputCantidadProps) {
  return (
    <TextField
      fullWidth
      inputRef={ref}
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      autoComplete="off"
      label="Cantidad"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={() => setValue(value - 1)}>
                <Icon>remove</Icon>
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setValue(value + 1)}>
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
