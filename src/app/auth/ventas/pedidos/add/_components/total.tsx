import { Typography } from "@mui/material";
import useHook from "../_hooks/useHook";

function Total() {
  const { pedidos, index } = useHook();
  return (
    <Typography fontWeight='bold' variant="button">Total: {pedidos[index].total.toLocaleString('es-PY')} </Typography>
  );
}

export default Total;
