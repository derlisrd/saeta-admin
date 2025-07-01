import { Grid, Box, Button, Tooltip, CircularProgress } from "@mui/material";
import Item from "./item";
import useHook from "../_hooks/useHook";
import CardItem from "./carditem";
import Icon from "@/components/ui/icon";
import useModal from "../_hooks/useModal";



function Items() {
  const { pedidos, removeItem, index, loadingAddProducto } = useHook();
  const { handleModal } = useModal()
  return (
    <Box>
      {loadingAddProducto ? <CircularProgress /> :
        <>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent={"center"}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Grid sx={{ backgroundColor: 'background.default' }} size={{ xs: 12, sm: 2 }}>Cod.</Grid>
            <Grid sx={{ backgroundColor: 'background.default' }} size={{ xs: 12, sm: 5 }}>Producto</Grid>
            <Grid sx={{ backgroundColor: 'background.default' }} size={{ xs: 12, sm: 2 }}>Cant.</Grid>
            <Grid sx={{ backgroundColor: 'background.default' }} size={{ xs: 12, sm: 2 }}>Sub.</Grid>
            <Grid sx={{ backgroundColor: 'background.default' }} size={{ xs: 12, sm: 1 }}>Opc.</Grid>
            <Grid size={12}>
              {pedidos[index].items.map((item, i) => (
                <Item key={i} index={i} item={item} removeItem={() => removeItem(item.producto_id)} />
              ))}
            </Grid>
          </Grid>
          <Grid container direction='row' spacing={1} alignItems='center'
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <Grid size={12}>
              <Tooltip title='Agregar producto' arrow>
                <Button size="large" onClick={() => handleModal('productos')}><Icon name='shopping-cart-plus' /></Button>
              </Tooltip>
            </Grid>
            {pedidos[index].items.map((item, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <CardItem item={item} removeItem={() => removeItem(item.producto_id)} />
              </Grid>
            ))}
          </Grid>
        </>
      }

    </Box>
  );
}

export default Items;
