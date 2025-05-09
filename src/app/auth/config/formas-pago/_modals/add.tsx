import Icon from "@/components/ui/icon";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormLabel, Grid2 as Grid, Stack, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { useForm, Controller } from "react-hook-form";
import { FormasPagoAdd } from "@/services/dto/config/formaspago";

interface AddModalProps {
  open: boolean;
  onClose: () => void;
}

function AddModal(props: AddModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormasPagoAdd>({
    defaultValues: {
      descripcion: "",
      tipo: "efectivo",
      porcentaje_descuento: 0,
    },
    mode: "onBlur", // Validar al perder el foco
  });

  const onSubmit = (data: FormasPagoAdd) => console.log(data);

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Agregar forma de pago</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={2}>
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
                  defaultValue="efectivo" // Establece el valor por defecto
                  render={({ field }) => (
                    <>
                      <FormControlLabel
                        value="efectivo"
                        control={
                          <Checkbox
                            {...field} // Vincula el campo con el input
                            icon={<Icon size={22}>circle-dashed</Icon>}
                            checkedIcon={<Icon size={22}>circle-check</Icon>}
                          />
                        }
                        label="Efectivo"
                      />
                      <FormControlLabel
                        value="digital"
                        control={
                          <Checkbox
                            {...field} // Vincula el campo con el input
                            icon={<Icon size={22}>circle-dashed</Icon>}
                            checkedIcon={<Icon size={22}>circle-check</Icon>}
                          />
                        }
                        label="Banco o digital"
                      />
                    </>
                  )}
                />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Controller
                name="porcentaje_descuento"
                control={control}
                defaultValue={0}
                rules={{
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
                  <NumericFormat
                    {...field} // Vincula el campo con el input
                    customInput={TextField}
                    thousandSeparator="."
                    decimalSeparator=","
                    label="Porcentaje de descuento"
                    placeholder="Descuento"
                    fullWidth
                    onValueChange={(values) => {
                      field.onChange(values.floatValue); // Actualiza el valor en react-hook-form
                    }}
                    value={field.value} // Usa el valor controlado por react-hook-form
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={props.onClose} startIcon={<Icon>arrow-narrow-left-dashed</Icon>}>
            Regresar
          </Button>
          <Button type="submit" variant="contained" startIcon={<Icon>device-floppy</Icon>}>
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddModal;
