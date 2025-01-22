import { Checkbox, FormControlLabel } from "@mui/material";
import useHook from "../_hooks/useHook";

function EntregadoCheck() {
  const { pedidos, index } = useHook();
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={pedidos[index].entregado}
          onChange={(e) => {
            console.log(e);
          }}
        />
      }
      label="Producto entregado?"
    />
  );
}

export default EntregadoCheck;
