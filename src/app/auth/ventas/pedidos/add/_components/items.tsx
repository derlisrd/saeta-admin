import { Box, Grid2 as Grid, Button } from "@mui/material";
import Item from "./item";
import useHook from "../_hooks/useHook";
import Icon from "@/components/ui/icon";
import useModal from "../_hooks/useModal";
import CardItem from "./carditem";

function Items() {
  const { pedidos, removeItem, index } = useHook();
  const { handleModal } = useModal()
  return (
    <Box>
      <Grid container spacing={1} direction="row" sx={{
        display: { xs: "none", md: "flex" }, borderRadius: 1
      }} alignItems="center" justifyContent={"center"}>
        <Grid size={{ xs: 12, sm: 2 }}>Cod.</Grid>
        <Grid size={{ xs: 12, sm: 5 }}>Producto</Grid>
        <Grid size={{ xs: 12, sm: 2 }}>Cant.</Grid>
        <Grid size={{ xs: 12, sm: 2 }}>Sub.</Grid>
        <Grid size={{ xs: 12, sm: 1 }}>Opc.</Grid>
        <Grid size={12}>
          {pedidos[index].items.map((item, i) => (
            <Item key={i} index={i} item={item} removeItem={() => removeItem(item.producto_id)} />
          ))}
        </Grid>
      </Grid>
      <Grid container sx={{ display: { xs: "flex", md: "none" } }}>
        <Grid size={3}>
          <Button fullWidth size="large" onClick={() => handleModal('productos')} sx={{ p: 2 }}>
            <Icon size={28}>shopping-cart-plus</Icon>
          </Button>
        </Grid>
        {pedidos[index].items.map((item, i) => (
          <Grid key={i} size={3}>
            <CardItem item={item} removeItem={() => removeItem(item.producto_id)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Items;
