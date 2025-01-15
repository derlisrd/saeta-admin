import { Box, Paper, Grid2 as Grid } from "@mui/material";
import Item from "./item";
import { AddPedidoItem } from "@/services/dto/pedidos/AddPedido";

interface ItemsProps {
  items: AddPedidoItem[];
}

function Items({ items }: ItemsProps) {
  return (
    <Box component={Paper}>
      <Grid container columns={12} spacing={{ xs: 1 }} direction={{ xs: "column", sm: "row", md: "row" }}>
        <Grid size={{ xs: 12, sm: 2 }}>Cod.</Grid>
        <Grid size={{ xs: 12, sm: 6 }}>Producto.</Grid>
        <Grid size={{ xs: 12, sm: 1 }}>Cant.</Grid>
        <Grid size={{ xs: 12, sm: 3 }}>Subtotal.</Grid>
        {items.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </Grid>
    </Box>
  );
}

export default Items;
