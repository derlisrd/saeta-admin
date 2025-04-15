import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import useHook from "../_hooks/useHook";
import FormaPagoSelect from "../_components/formapagoselect";
import useInsertPedido from "../_hooks/useInsertPedido";
import useValidator from "../_hooks/useValidator";
import EntregadoCheck from "../_components/entregadocheck";
import useModal from "../_hooks/useModal";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import ListaFormaPago from "../_components/listaformapago";
import Teclado from "../_components/teclado";
import useFinalizarPedido from "../_hooks/useFinalizarPedido";
import useResponsive from "@/hooks/useResponsive";

function FinalizarPedido() {
  const { pedidos, index, setResult, handleFormasPago } = useHook();
  const { isSmDown } = useResponsive();
  const { setError, error } = useFinalizarPedido();
  const { modal, handleModal, setModal } = useModal();
  const { insertPedido, isLoading } = useInsertPedido();
  const { validate } = useValidator();
  const [selectedFormaPago, setSelectedFormaPago] = useState<number>(0);
  const [monto, setMonto] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const agregarFormaPago = () => {
    if (selectedFormaPago === 0) return setError({ active: true, message: "Seleccione una forma de pago", code: 43 });
    setError({ active: false, message: "", code: 0 });
    handleFormasPago(monto, selectedFormaPago, "add");
    setMonto(0);
    setSelectedFormaPago(0);
  };

  const handleNumberClick = (value: string) => {
    const newValue = inputValue + value;
    setInputValue(newValue);
    // Convertir el valor a número y actualizar el estado monto
    setMonto(parseFloat(newValue.replace(/\./g, "")));
  };
  const handleBackspace = () => {
    if (inputValue.length > 0) {
      // Eliminar el último carácter del inputValue
      const newValue = inputValue.slice(0, -1);
      setInputValue(newValue);

      // Actualizar también el valor numérico
      if (newValue === "") {
        setMonto(0);
      } else {
        const numericValue = newValue.replace(/\./g, "");
        setMonto(parseFloat(numericValue) || 0);
      }
    }
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
      setModal({ ...modal, finalizar: false, main: false, success: true });
    }
  };

  return (
    <Dialog maxWidth="sm" disableRestoreFocus fullScreen={isSmDown} open={modal.finalizar} onClose={() => handleModal("finalizar")}>
      <DialogTitle>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Typography variant="button" sx={{ display: { xs: "none", sm: "block" } }}>
            Forma de pago
          </Typography>
          <Typography variant="h6">Total: {pedidos[index].total.toLocaleString("es-PY")}</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={2} pt={1} alignItems="center">
            <Grid size={{ xs: 12, sm: 12 }}>
              <FormaPagoSelect selectedFormaPago={selectedFormaPago} setSelectedFormaPago={setSelectedFormaPago} error={error.code === 43} />
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <NumericFormat
                customInput={TextField}
                thousandSeparator="."
                decimalSeparator=","
                placeholder="Monto abonado"
                name="monto"
                onValueChange={(e) => {
                  setMonto(Number(e.value));
                  setInputValue(e.formattedValue);
                }}
                value={monto}
                fullWidth
                required
                label="Monto abonado"
                error={error.code === 7}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Teclado onEnter={agregarFormaPago} onNumberClick={handleNumberClick} onBackspace={handleBackspace} />
            </Grid>

            <Grid size={{ xs: 12, sm: 12 }}>
              <ListaFormaPago />
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
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
