import { Checkbox, FormControlLabel } from "@mui/material";
import useHook from "../_hooks/useHook";

function EntregadoCheck() {
  const { pedidos, index, changePedido } = useHook();
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={pedidos[index].entregado}
          onChange={(e) => {
            changePedido("entregado", e.target.checked);
          }}
        />
      }
      label="Producto entregado?"
    />
  );
}

export default EntregadoCheck;
