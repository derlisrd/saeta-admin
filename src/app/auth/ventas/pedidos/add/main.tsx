import { Box, Container, Dialog, DialogContent, Fade, Grid, Stack, Typography } from "@mui/material";
import Items from "./_components/items";
import Error from "./_components/error";
import InputCodigo from "./_components/codigo";
import Title from "./_components/title";
import useHook from "./_hooks/useHook";
import InputCantidad from "./_components/cantidad";
import FinalizarButton from "./_components/finalizarbtn";
import CancelarButton from "./_components/cancelarbtn";
import EsperarButton from "./_components/esperarbtn";
// import ListaDeEspera from "./_components/listadeespera";
import useModal from "./_hooks/useModal";

function Main() {
  const { error, clearError, pedidos, index } = useHook();
  const { modal } = useModal();


  return (
    <Dialog open={modal.main} fullScreen TransitionComponent={Fade} disableRestoreFocus PaperProps={{ sx: { borderRadius: "0" } }}>
      <Error error={error} clearError={clearError} />
      <Title />
      <DialogContent>
        <Container maxWidth="lg">
          <Grid container spacing={1} sx={{ height: "100%" }}>
            <Grid size={{ xs: 12, sm: 12, md: 8, lg: 9 }}>
              <Items />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 3 }}>
              <Box sx={{ height: { xs: "180px", md: "0" } }} />
              <Box
                sx={{
                  position: { xs: "fixed", md: "relative" },
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  px: { xs: 2, md: 0 },
                  backgroundColor: { xs: "background.default", md: "transparent" },
                  zIndex: 1,
                }}
              >
                <Stack spacing={1} justifyContent="space-between" height="100%">
                  <Stack spacing={2}>
                    <InputCodigo />
                    <InputCantidad />
                  </Stack>
                  <Stack spacing={1} pb={1}>
                    <Typography fontWeight='bold'>Total: {pedidos[index].total.toLocaleString('es-PY')} </Typography>
                    <Stack direction='row' spacing={1}>
                      <EsperarButton />
                      <FinalizarButton />
                    </Stack>
                    <CancelarButton />
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  );
}

export default Main;
