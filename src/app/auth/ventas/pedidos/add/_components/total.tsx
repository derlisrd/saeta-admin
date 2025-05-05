import { Stack, Typography } from "@mui/material";
import useHook from "../_hooks/useHook";

function Total() {
  const { pedidos, index } = useHook();
  return (
    <Stack direction="row" spacing={1}>
      {pedidos[index].descuento > 0 ? (
        <>
          <Typography variant="body1">Descuento: {pedidos[index].descuento.toLocaleString("es-PY")}</Typography>
          <Typography variant="body1">Total: {(pedidos[index].total - pedidos[index].descuento).toLocaleString("es-PY")}</Typography>
          <Typography variant="body1" sx={{ textDecorationLine: "line-through" }}>
            Total: {pedidos[index].total.toLocaleString("es-PY")}
          </Typography>
        </>
      ) : (
        <Typography variant="body1">Total: {pedidos[index].total.toLocaleString("es-PY")}</Typography>
      )}
    </Stack>
  );
}

export default Total;
