import { Fragment } from "react";
import { Grid2 as Grid, Icon, IconButton } from "@mui/material";
import { AddPedidoItem } from "@/services/dto/pedidos/AddPedido";

interface ItemProps {
  item: AddPedidoItem;
  removeItem: () => void;
}

function Item({ item, removeItem }: ItemProps) {
  return (
    <Fragment>
      <Grid size={{ xs: 12, sm: 2 }}>{item.codigo}</Grid>
      <Grid size={{ xs: 12, sm: 5 }}>{item.nombre}</Grid>
      <Grid size={{ xs: 12, sm: 1 }}>{item.cantidad}</Grid>
      <Grid size={{ xs: 12, sm: 2 }}>{item.total}</Grid>
      <Grid size={{ xs: 12, sm: 2 }}>
        <IconButton onClick={removeItem} size="small">
          <Icon fontSize="small">delete</Icon>
        </IconButton>
      </Grid>
    </Fragment>
  );
}

export default Item;
