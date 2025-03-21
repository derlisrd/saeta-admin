import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, LinearProgress, TextField } from "@mui/material";
import useHook from "../_hooks/useHook";
import FormaPagoSelect from "../_components/formapagoselect";
import useInsertPedido from "../_hooks/useInsertPedido";
import useValidator from "../_hooks/useValidator";
import EntregadoCheck from "../_components/entregadocheck";
import useModal from "../_hooks/useModal";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import ListaFormaPago from "../_components/listaformapago";

function FinalizarPedido() {
  const { pedidos, index, setResult, setError, error, handleFormasPago } = useHook();
  const { modal, handleModal } = useModal();
  const { insertPedido, isLoading } = useInsertPedido();
  const { validate } = useValidator();
  const [selectedFormaPago, setSelectedFormaPago] = useState<number>(0);
  const [monto, setMonto] = useState(0);

  const agregarFormaPago = () => {
    handleFormasPago(monto, selectedFormaPago, "add");
    setMonto(0);
    setSelectedFormaPago(0);
  };

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
      handleModal("success");
    }
  };

  return (
    <Dialog maxWidth="lg" open={modal.finalizar} onClose={() => handleModal("finalizar")}>
      <DialogTitle>Finalizar Pedido</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={2} pt={1} alignItems="center">
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormaPagoSelect selectedFormaPago={selectedFormaPago} setSelectedFormaPago={setSelectedFormaPago} error={error.code === 3} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <NumericFormat
                customInput={TextField}
                thousandSeparator="."
                decimalSeparator=","
                placeholder="Monto abonado"
                name="monto"
                onValueChange={(e) => {
                  setMonto(Number(e.value));
                }}
                value={monto}
                fullWidth
                required
                label="Monto abonado"
                error={error.code === 7}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Button onClick={agregarFormaPago}>Agregar</Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ListaFormaPago />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <EntregadoCheck />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" disabled={isLoading} color="primary" sx={{ p: 2 }} onClick={finalizarPedido}>
          Finalizar pedido
        </Button>
        <Button variant="outlined" disabled={isLoading} color="warning" sx={{ p: 2 }} onClick={() => handleModal("finalizar")}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FinalizarPedido;
