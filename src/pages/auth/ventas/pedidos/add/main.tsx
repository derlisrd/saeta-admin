import { Dialog, DialogContent, Fade, Grid2 as Grid } from "@mui/material";
import useAddPedido from "./useAddPedido";
import Items from "./_components/items";
import Error from "./_components/error";
import InputCodigo from "./_components/codigo";
import Title from "./_components/title";

function Main() {
  const { modal, pedido, consultarCodigoInsertar, error, clearError } = useAddPedido();

  return (
    <Dialog open={modal.main} fullScreen TransitionComponent={Fade}>
      <Error error={error} clearError={clearError} />
      <Title />
      <DialogContent>
        <Grid container spacing={{ xs: 1 }}>
          <Grid size={{ xs: 12, sm: 12, md: 8, lg: 9 }}>
            <Items items={pedido.items} />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4, lg: 3 }}>
            <InputCodigo consultarCodigoInsertar={consultarCodigoInsertar} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default Main;
