import { Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, Grid2 as Grid, InputLabel, MenuItem, Select } from "@mui/material";
import useHook from "../useHook";

function FinalizarPedido() {
  const { modal, handleModal, pedidos, index, formasPago } = useHook();
  return (
    <Dialog open={modal.finalizar} fullScreen onClose={() => handleModal("finalizar", false)}>
      <DialogTitle>Finalizar Pedido</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} pt={1}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="formas-select-label">Formas de pago</InputLabel>
              <Select fullWidth labelId="formas-label" id="formas-select" onChange={() => {}} value={pedidos[index].formas_pago_id} label="Impuesto" name="impuesto_id">
                <MenuItem value={0} disabled>
                  Seleccionar forma de pago
                </MenuItem>
                {formasPago.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.descripcion}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Formas de pago</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default FinalizarPedido;
