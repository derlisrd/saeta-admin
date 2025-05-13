import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Grid2 as Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import useHook from "../_hooks/useHook";
import Icon from "@/components/ui/icon";
import Teclado from "../_components/teclado";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import ListaFormaPago from "../_components/listaformapago";
import useModal from "../_hooks/useModal";
import Total from "../_components/total";
import useResponsive from "@/hooks/useResponsive";
import useValidateFormaPago from "../_hooks/useValidateFormaPago";

function FormaPagoModal() {
  const { formasPago, pedidos, index, changePedido, handleFormasPago } = useHook();
  const { isMdDown } = useResponsive();
  const { modal, handleModal, setModal } = useModal();
  const { error, validate, setError } = useValidateFormaPago();
  const [formaPagoSelected, setFormaPagoSelected] = useState<number>(0);
  const [monto, setMonto] = useState<number | undefined>(undefined);
  const [inputValue, setInputValue] = useState("");

  const clear = () => {
    setInputValue("");
    setMonto(undefined);
    setError({ code: 0, message: "" });
    setFormaPagoSelected(0);
  };
  const close = () => {
    setError({ code: 0, message: "" });
    handleModal("formapago");
  };

  const agregarFormaPago = () => {
    if (monto === undefined || monto === 0) {
      setError({ code: 2, message: "Ingrese monto a abonar" });
      return;
    }
    handleFormasPago(monto, formaPagoSelected, "add");
    clear();
  };

  const handleNumberClick = (value: string) => {
    if (formaPagoSelected === 0) {
      setError({ code: 1, message: "Presione una forma de pago. Ej: efectivo" });
      return;
    }
    const newValue = inputValue + value;
    setInputValue(newValue);
    // Convertir el valor a número y actualizar el estado monto
    setMonto(parseFloat(newValue.replace(/\./g, "")) || 0); // Asegurar que sea 0 si la conversión falla
  };

  const handleBackspace = () => {
    if (inputValue.length > 0) {
      // Eliminar el último carácter del inputValue
      const newValue = inputValue.slice(0, -1);
      setInputValue(newValue);

      // Actualizar también el valor numérico
      if (newValue === "") {
        setMonto(undefined); // Resetear a undefined si no hay input
      } else {
        const numericValue = newValue.replace(/\./g, "");
        setMonto(parseFloat(numericValue) || undefined);
      }
    } else {
      setMonto(undefined); // Asegurar que sea undefined si se retrocede desde un input vacío
    }
  };

  const siguiente = () => {
    const validateError = validate(pedidos[index]);

    if (validateError.code > 0) {
      return setError(validateError);
    }
    setFormaPagoSelected(0);
    setMonto(undefined);
    setModal({ ...modal, formapago: false, finalizar: true });
  };

  return (
    <Dialog open={modal.formapago} onClose={close} fullWidth maxWidth="md" fullScreen={isMdDown}>
      <DialogTitle>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Total />
          <Typography variant="button" fontSize={14} fontWeight="bold" sx={{ display: { xs: "none", sm: "block" } }}>
            Seleccione formas de pago
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            {error.code > 0 && (
              <Zoom in>
                <Alert severity="error" variant="outlined" icon={<Icon>exclamation-circle</Icon>}>
                  {error.message}
                </Alert>
              </Zoom>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
              <FormLabel>Condición de venta: </FormLabel>
              <FormControlLabel
                value={0}
                control={<Checkbox icon={<Icon size={22}>circle-dashed</Icon>} checkedIcon={<Icon size={22}>circle-check</Icon>} />}
                checked={pedidos[index].condicion === 0}
                onChange={() => changePedido("condicion", 0)}
                label="Contado"
              />
              <FormControlLabel
                value={1}
                control={<Checkbox icon={<Icon size={22}>circle-dashed</Icon>} checkedIcon={<Icon size={22}>circle-check</Icon>} />}
                checked={pedidos[index].condicion === 1}
                onChange={() => changePedido("condicion", 1)}
                label="Crédito"
              />
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack direction="row" spacing={2}>
              {formasPago.map((e, i) => (
                <Button
                  key={i}
                  size="small"
                  onClick={() => {
                    setFormaPagoSelected(e.id);
                    setError({ code: 0, message: "" });
                  }}
                  variant={formaPagoSelected === e.id ? "contained" : "outlined"}
                  startIcon={<Icon size={24}>{e.tipo === "efectivo" ? "cash" : "credit-card-pay"}</Icon>}
                  endIcon={<Icon size={24}>{formaPagoSelected === e.id ? "circle-check" : "circle-dashed"}</Icon>}
                >
                  {e.descripcion}
                </Button>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 7, lg: 6 }}>
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
              value={monto ? monto : ""}
              fullWidth
              required
              label="Monto abonado"
              slotProps={{
                input: {
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={clear}>
                        <Icon>x</Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6 }}></Grid>
          <Grid size={{ xs: 12, sm: 8, md: 7, lg: 6 }}>
            <Teclado onBackspace={handleBackspace} onEnter={agregarFormaPago} clear={clear} onNumberClick={handleNumberClick} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 5, lg: 6 }}>
            <ListaFormaPago />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" startIcon={<Icon>arrow-narrow-left-dashed</Icon>} color="secondary" sx={{ p: 2 }} onClick={close}>
          Regresar
        </Button>
        <Button sx={{ p: 2 }} onClick={siguiente} endIcon={<Icon>arrow-narrow-right-dashed</Icon>}>
          Siguiente
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormaPagoModal;
