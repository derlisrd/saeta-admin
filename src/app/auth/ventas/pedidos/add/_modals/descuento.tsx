import { DialogTitle, Dialog, Grid2 as Grid, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import useHook from "../_hooks/useHook";
import useModal from "../_hooks/useModal";
import { useState } from "react";
import { NumericFormat } from "react-number-format";

function DescuentoModal() {
  const { aplicarDescuento, pedidos, index } = useHook();
  const { modal, setModal } = useModal();
  const [montoDescuento, setMontoDescuento] = useState(0);
  const [error, setError] = useState({ code: 0, message: "" });

  const close = () => {
    setError({ code: 0, message: "" });
    setMontoDescuento(0);
    setModal({ ...modal, finalizar: true, descuento: false });
  };

  const aplicar = () => {
    if (montoDescuento > pedidos[index].total) return setError({ code: 43, message: "El monto no puede ser mayor al total" });
    aplicarDescuento(montoDescuento);
    close();
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={modal.descuento} onClose={close} disableRestoreFocus>
      <DialogTitle>Aplicar Descuento</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} pt={1}>
          <Grid size={12}>
            <NumericFormat
              autoFocus
              customInput={TextField}
              thousandSeparator="."
              decimalSeparator=","
              placeholder="Descuento"
              name="descuento"
              onValueChange={(e) => {
                setMontoDescuento(Number(e.value));
                //setInputValue(e.formattedValue);
              }}
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  aplicar();
                }
              }}
              value={montoDescuento}
              fullWidth
              required
              helperText={error.message}
              error={error.code === 43}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            aplicar();
          }}
        >
          Aplicar
        </Button>
        <Button variant="outlined" onClick={close}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DescuentoModal;
