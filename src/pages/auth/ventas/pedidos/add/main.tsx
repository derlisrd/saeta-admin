import { Dialog, DialogContent, Fade, Grid2 as Grid, Stack } from "@mui/material";
import Items from "./_components/items";
import Error from "./_components/error";
import InputCodigo from "./_components/codigo";
import Title from "./_components/title";
import useHook from "./useHook";
import InputCantidad from "./_components/cantidad";

function Main() {
  const { modal, pedido, consultarCodigoInsertar, error, clearError, handleModal } = useHook();

  return (
    <Dialog open={modal.main} fullScreen TransitionComponent={Fade}>
      <Error error={error} clearError={clearError} />
      <Title handleModal={handleModal} />
      <DialogContent>
        <Grid container spacing={{ xs: 1, sm: 1 }}>
          <Grid size={{ xs: 12, sm: 12, md: 8, lg: 9 }}>
            <Items items={pedido.items} />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4, lg: 3 }}>
            <Stack spacing={2}>
              <InputCodigo consultarCodigoInsertar={consultarCodigoInsertar} />
              <InputCantidad />
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default Main;
