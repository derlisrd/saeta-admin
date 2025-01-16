import { Box, Paper, Grid2 as Grid } from "@mui/material";
import Item from "./item";
import useHook from "../useHook";

function Items() {
  const { pedidos, removeItem, index } = useHook();
  return (
    <Box component={Paper}>
      <Grid container size={{ xs: 0, sm: 12 }} spacing={{ xs: 1 }} direction={{ xs: "column", sm: "row", md: "row" }} alignItems="center">
        <Grid size={{ xs: 0, sm: 2 }}>Cod.</Grid>
        <Grid size={{ xs: 0, sm: 5 }}>Producto.</Grid>
        <Grid size={{ xs: 0, sm: 1 }}>Cant.</Grid>
        <Grid size={{ xs: 0, sm: 2 }}>Sub.</Grid>
        <Grid size={{ xs: 0, sm: 2 }}>Opc.</Grid>
        {pedidos[index].items.map((item, i) => (
          <Item key={i} item={item} removeItem={() => removeItem(item.producto_id)} />
        ))}
      </Grid>
    </Box>
  );
}

export default Items;
