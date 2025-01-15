import { Fragment } from "react";
import { Grid2 as Grid } from "@mui/material";
import { AddPedidoItem } from "@/services/dto/pedidos/AddPedido";

interface ItemProps {
  item: AddPedidoItem;
}

function Item({ item }: ItemProps) {
  return (
    <Fragment>
      <Grid size={{ xs: 12, sm: 2 }}>{item.codigo}</Grid>
      <Grid size={{ xs: 12, sm: 6 }}>{item.nombre}</Grid>
      <Grid size={{ xs: 12, sm: 1 }}>{item.cantidad}</Grid>
      <Grid size={{ xs: 12, sm: 3 }}>{item.total}</Grid>
    </Fragment>
  );
}

export default Item;
