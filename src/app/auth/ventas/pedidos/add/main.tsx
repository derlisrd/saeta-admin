import { Box, Container, Dialog, DialogContent, Fade, Grid2 as Grid } from "@mui/material";
import Items from "./_components/items";
import Error from "./_components/error";
import InputCodigo from "./_components/codigo";
import Title from "./_components/title";
import useHook from "./_hooks/useHook";
import InputCantidad from "./_components/cantidad";
import FinalizarButton from "./_components/finalizarbtn";
import AgregarButton from "./_components/agregarbtn";
import CancelarButton from "./_components/cancelarbtn";
import EsperarButton from "./_components/esperarbtn";
import ListaDeEspera from "./_components/listadeespera";
import useModal from "./_hooks/useModal";

function Main() {
  const { error, clearError } = useHook();
  const { modal } = useModal();


  return (
    <Dialog open={modal.main} fullScreen TransitionComponent={Fade} disableRestoreFocus PaperProps={{ sx: { borderRadius: "0" } }}>
      <Error error={error} clearError={clearError} />
      <Title />
      <DialogContent>
        <Container maxWidth="lg">
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, sm: 12, md: 8, lg: 9 }}>
              <Items />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 3 }}>
              <Box sx={{ position: { xs: 'fixed', md: 'relative' }, bottom: 0, left: 0, width: '100%', px: { xs: 2, md: 0 } }}>
                <Grid container spacing={2} pt={1}>
                  <Grid size={12}>
                    <InputCodigo />
                  </Grid>
                  <Grid size={12}>
                    <InputCantidad />
                  </Grid>
                  <Grid size={12}>
                    <AgregarButton />
                  </Grid>
                  <Grid size={6}>
                    <FinalizarButton />
                  </Grid>
                  <Grid size={6}>
                    <CancelarButton />
                  </Grid>
                  <Grid size={12}>
                    <EsperarButton />
                  </Grid>
                  <Grid size={12}>
                    <ListaDeEspera />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  );
}

export default Main;
