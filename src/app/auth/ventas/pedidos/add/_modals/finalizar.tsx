import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, LinearProgress, Link, Stack, Typography } from "@mui/material";
import useHook from "../_hooks/useHook";

import useInsertPedido from "../_hooks/useInsertPedido";
import EntregadoCheck from "../_components/entregadocheck";
import useModal from "../_hooks/useModal";

import Total from "../_components/total";
import Icon from "@/components/ui/icon";

function FinalizarPedido() {
  const { pedidos, index, setResult, aplicarDescuento } = useHook();
  //const { isSmDown } = useResponsive();
  const { modal, handleModal, setModal } = useModal();
  const { insertPedido, isLoading } = useInsertPedido();

  const finalizarPedido = async () => {


    const res = await insertPedido(pedidos[index]);
    if (!res.success) {
      setResult(res);
      handleModal("error");
    }

    if (res.success && res.results) {
      setResult(res);
      setModal({ ...modal, finalizar: false, main: false, success: true });
    }
  };

  return (
    <Dialog disableRestoreFocus fullWidth open={modal.finalizar} onClose={() => handleModal("finalizar")}>
      <DialogTitle>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Typography variant="button" sx={{ display: { xs: "none", sm: "block" } }}>
            Confirmar venta | detalles de venta
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid size={12}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Link
                  href="#"
                  onClick={() => {
                    setModal({ ...modal, finalizar: false, descuento: true });
                  }}
                >
                  Aplicar descuento
                </Link>
                {pedidos[index].descuento > 0 && (
                  <Link
                    href="#"
                    onClick={() => {
                      aplicarDescuento(0);
                    }}
                  >
                    Remover descuento
                  </Link>
                )}
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <EntregadoCheck />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Typography variant="button" fontWeight="bold">
                {pedidos[index].cliente}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Total />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" startIcon={<Icon>arrow-narrow-left-dashed</Icon>} disabled={isLoading} sx={{ p: 2 }} onClick={() => handleModal("finalizar")}>
          Regresar
        </Button>
        <Button endIcon={<Icon>check</Icon>} disabled={isLoading} sx={{ p: 2 }} onClick={finalizarPedido}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FinalizarPedido;
