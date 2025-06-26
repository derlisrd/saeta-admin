import Icon from "@/components/ui/icon";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormLabel, Grid2 as Grid, LinearProgress, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { FormasPagoAdd } from "@/services/dto/config/formaspago";
import { useFormasPagoContext } from "../provider";



function AddFormasPagoModal() {
  const { isPending, insertar, modals, handleModals } = useFormasPagoContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormasPagoAdd>({
    defaultValues: {
      descripcion: "",
      tipo: "caja",
      condicion: "contado",
      porcentaje_descuento: 0,
    },
    mode: "onBlur", // Validar al perder el foco
  });

  const onSubmit = (data: FormasPagoAdd) => insertar(data);

  const close = () => handleModals("add")

  return (
    <Dialog open={modals.add} onClose={close} fullWidth >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Agregar forma de pago</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              {isPending && <LinearProgress />}
            </Grid>
            <Grid size={12}>
              <Controller
                control={control}
                name="descripcion"
                rules={{
                  required: "Descripción es obligatoria.",
                }}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Descripción" autoComplete="off" autoFocus error={!!errors.descripcion} helperText={errors.descripcion?.message} />
                )}
              />
            </Grid>
            <Grid size={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <FormLabel>Tipo: </FormLabel>
                <Controller
                  name="tipo"
                  control={control}
                  render={({ field }) => (
                    <Stack direction="row" spacing={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled={isPending}
                            icon={<Icon size={22} name='circle-dashed' />}
                            checkedIcon={<Icon size={22} name='circle-check' />}
                            checked={field.value === "caja"}
                            onChange={() => field.onChange("caja")}
                          />
                        }
                        label="Efectivo o caja"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled={isPending}
                            icon={<Icon size={22} name='circle-dashed' />}
                            checkedIcon={<Icon size={22} name='circle-check' />}
                            checked={field.value === "banco"}
                            onChange={() => field.onChange("banco")}
                          />
                        }
                        label="Banco o digital"
                      />
                    </Stack>
                  )}
                />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <FormLabel>Condición de forma de pago: </FormLabel>
                <Controller
                  name="condicion"
                  control={control}
                  render={({ field }) => (
                    <Stack direction="row" spacing={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled={isPending}
                            icon={<Icon size={22} name='circle-dashed' />}
                            checkedIcon={<Icon size={22} name='circle-check' />}
                            checked={field.value === "contado"}
                            onChange={() => field.onChange("contado")}
                          />
                        }
                        label="Contado"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled={isPending}
                            icon={<Icon size={22} name='circle-dashed' />}
                            checkedIcon={<Icon size={22} name='circle-check' />}
                            checked={field.value === "credito"}
                            onChange={() => field.onChange("credito")}
                          />
                        }
                        label="Crédito"
                      />
                    </Stack>
                  )}
                />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Controller
                name="porcentaje_descuento"
                control={control}
                rules={{
                  pattern: {
                    value: /^\d*\.?\d*$/,
                    message: "El porcentaje debe ser un número.",
                  },
                  min: {
                    value: 0,
                    message: "El porcentaje mínimo es 0.",
                  },
                  max: {
                    value: 100,
                    message: "El porcentaje máximo es 100.",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    label="Porcentaje de descuento"
                    placeholder="Descuento"
                    fullWidth
                    error={!!errors.porcentaje_descuento}
                    helperText={errors.porcentaje_descuento?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={close} startIcon={<Icon name='arrow-narrow-left-dashed' />}>
            Regresar
          </Button>
          <Button type="submit" variant="contained" disabled={isPending} startIcon={<Icon name='device-floppy' />}>
            {isPending ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddFormasPagoModal;
