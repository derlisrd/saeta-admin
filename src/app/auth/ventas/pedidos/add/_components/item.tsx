
import { Grid2 as Grid, IconButton } from "@mui/material";
import { AddPedidoItem } from "@/services/dto/pedidos/AddPedido";
import Icon from "@/components/ui/icon";

interface ItemProps {
  item: AddPedidoItem;
  removeItem: () => void;
  index: number;
}

function Item({ item, removeItem, index }: ItemProps) {
  return (
    <Grid container sx={index % 2 !== 0 ? { backgroundColor: 'background.default' } : {}}>
      <Grid size={{ xs: 12, sm: 2 }}>{item.codigo}</Grid>
      <Grid size={{ xs: 12, sm: 5 }}>{item.nombre}</Grid>
      <Grid size={{ xs: 12, sm: 2 }}>{item.cantidad}</Grid>
      <Grid size={{ xs: 12, sm: 2 }}>{item.total.toLocaleString("es-PY")}</Grid>
      <Grid size={{ xs: 12, sm: 1 }}>
        <IconButton onClick={removeItem} size="small">
          <Icon name='trash' />
        </IconButton>
      </Grid>

    </Grid>
  );
}

export default Item;
