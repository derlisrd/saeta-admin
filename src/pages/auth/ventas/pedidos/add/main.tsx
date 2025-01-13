import { Dialog, DialogContent, DialogTitle, Fade, Grid2 as Grid, Icon, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography, Zoom } from "@mui/material";
import useAddPedido from "./useAddPedido";

function Main() {
  const { modal } = useAddPedido();
  return (
    <Dialog open={modal.main} fullScreen TransitionComponent={Fade}>
      <DialogTitle>
        <Stack direction={{ xs: "row" }} alignItems="center">
          <Tooltip title="Volver" slots={{ transition: Zoom }} arrow placement="right-start">
            <IconButton onClick={() => {}} color="primary">
              <Icon>arrow_back_ios_new</Icon>
            </IconButton>
          </Tooltip>
          <Typography variant="body1">Pedido | Total: Gs</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={{ xs: 1 }}>
          <Grid size={{ xs: 12, sm: 8, md: 8, lg: 9 }}>
            <h6>ITEMS</h6>
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 4, lg: 3 }}>
            <TextField
              placeholder="Código"
              fullWidth
              autoComplete="off"
              autoFocus
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <Icon>search</Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default Main;
