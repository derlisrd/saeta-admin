import { Box, Paper, Grid2 as Grid } from "@mui/material";
import Item from "./item";
import { AddPedidoItem } from "@/services/dto/pedidos/AddPedido";

interface ItemsProps {
  items: AddPedidoItem[];
}

function Items({ items }: ItemsProps) {
  return (
    <Box component={Paper}>
      <Grid container size={{ xs: 0, sm: 12 }} spacing={{ xs: 1 }} direction={{ xs: "column", sm: "row", md: "row" }}>
        <Grid size={{ xs: 0, sm: 2 }}>Cod.</Grid>
        <Grid size={{ xs: 0, sm: 5 }}>Producto.</Grid>
        <Grid size={{ xs: 0, sm: 1 }}>Cant.</Grid>
        <Grid size={{ xs: 0, sm: 2 }}>Sub.</Grid>
        <Grid size={{ xs: 0, sm: 2 }}>Opc.</Grid>
        {items.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </Grid>
    </Box>
  );
}

export default Items;
