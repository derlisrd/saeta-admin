import { Button, Dialog, DialogContent, DialogTitle, Grid2 as Grid, Stack } from "@mui/material";
import useHook from "../_hooks/useHook";
import Icon from "@/components/ui/icon";
import Teclado from "../_components/teclado";

function FormaPagoModal() {
  const { formasPago } = useHook();
  return (
    <Dialog open onClose={() => {}}>
      <DialogTitle>Seleccionar forma de pago</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid size={12}>
            <Stack direction="row">
              {formasPago.map((e, i) => (
                <Button sx={{ p: 2 }} key={i} startIcon={<Icon size={24}>cash-banknote</Icon>}>
                  {e.descripcion}
                </Button>
              ))}
            </Stack>
          </Grid>
          <Grid size={12}>
            <Teclado onBackspace={() => {}} onEnter={() => {}} onNumberClick={() => {}} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default FormaPagoModal;
