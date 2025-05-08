import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Grid2 as Grid,
  LinearProgress,
  Link,
  Radio,
  Stack,
  Switch,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import useHook from "../_hooks/useHook";
import FormaPagoSelect from "../_components/formapagoselect";
import useInsertPedido from "../_hooks/useInsertPedido";
import EntregadoCheck from "../_components/entregadocheck";
import useModal from "../_hooks/useModal";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import ListaFormaPago from "../_components/listaformapago";
import Teclado from "../_components/teclado";
import useFinalizarPedido from "../_hooks/useFinalizarPedido";
import Total from "../_components/total";
import Icon from "@/components/ui/icon";

function FinalizarPedido() {
  const { pedidos, index, setResult, config, settingConfig, aplicarDescuento } = useHook();
  //const { isSmDown } = useResponsive();
  const { setError, error, validate } = useFinalizarPedido();
  const { modal, handleModal, setModal } = useModal();
  const { insertPedido, isLoading } = useInsertPedido();

  const finalizarPedido = async () => {
    const validateError = validate(pedidos[index]);

    if (validateError.active) {
      setError(validateError);
      setResult({ success: false, status: 400, message: validateError.message, results: null });
      handleModal("error");
      return;
    }
    setError({ active: false, message: "", code: 0 });
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
            Confirmar venta
          </Typography>
          <Total />
        </Stack>
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={2} pt={1}>
            <Grid size={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Stack direction="row" spacing={2}>
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
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <EntregadoCheck />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.showKeyboard}
                    onChange={() => {
                      settingConfig({ ...config, showKeyboard: !config.showKeyboard });
                    }}
                  />
                }
                label="Mostrar teclado"
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" startIcon={<Icon>arrow-narrow-left-dashed</Icon>} disabled={isLoading} color="secondary" sx={{ p: 2 }} onClick={() => handleModal("finalizar")}>
          Regresar
        </Button>
        <Button startIcon={<Icon>check</Icon>} disabled={isLoading} sx={{ p: 2 }} onClick={finalizarPedido}>
          Confirmar venta
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FinalizarPedido;
