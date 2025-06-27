import Icon from "@/components/ui/icon";
import { Box, Container, Grid2 as Grid, Paper, Typography, TextField, Stack, Button, LinearProgress, Alert } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { useLocation } from "react-router-dom";
import useCobrarCredito from "./_hooks/useCobrar";
import { CreditosResults } from "@/services/dto/pedidos/creditos";
import { useCobroForm } from "./_hooks/useCobroForm";
import { useCobrarCreditoActions } from "./_hooks/useCobrarCreditoActions";

function Cobrar() {
    const location = useLocation();
    const { formasPago, isLoading } = useCobrarCredito();
    const { form, errors, updateField, validateForm, resetForm } = useCobroForm();
    const { procesarCobro, isPending, error, cobroData, clearError } = useCobrarCreditoActions();

    const { state } = location;
    const credito = state?.credito as CreditosResults;

    const handleCobrar = async () => {
        if (!validateForm()) {
            return;
        }

        const result = await procesarCobro({
            forma_pago_id: form.forma_pago_id,
            monto: form.monto,
            credito_id: credito.id
        });

        if (result.success) {
            // Aquí puedes agregar lógica adicional como mostrar mensaje de éxito
            // o redirigir a otra página
            resetForm();
        }
    };
    console.log(errors)
    const montoAdeudado = credito ? credito.monto - credito.monto_abonado : 0;
    const excedeMonto = form.monto > montoAdeudado;

    if (!credito) return <Typography>No se encontró el crédito</Typography>;

    return (
        <Container>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <Typography variant="h5">Cobro de crédito</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12 }}>
                    {(isLoading || isPending) && <LinearProgress />}
                </Grid>
                {cobroData && (
                    <Grid size={12}>
                        <Alert severity="success" onClose={clearError}>
                            Cobro registrado exitosamente.
                            {cobroData.credito_pagado
                                ? " ¡Crédito completamente pagado!"
                                : ` Deuda restante: ${cobroData.deuda_restante.toLocaleString("es-PY")}`
                            }
                        </Alert>
                    </Grid>
                )}
                {error && (
                    <Grid size={12}>
                        <Alert severity="error">
                            {error.message}
                        </Alert>
                    </Grid>
                )}

                <Grid size={{ xs: 12, sm: 8 }}>
                    <Box component={Paper} boxShadow={4} borderRadius={4} padding={2}>
                        <Stack direction="column" spacing={2}>
                            <Typography variant="h6">Selecciona forma de pago</Typography>
                            {
                                errors && errors.forma_pago_id === 0 && (
                                    <Alert severity="error">
                                        Por favor, seleccione una forma de pago
                                    </Alert>
                                )
                            }
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {formasPago.map((formaPago) => (
                                    <Button
                                        key={formaPago.id}
                                        size="small"
                                        sx={{
                                            fontSize: "0.65rem",
                                            border: errors.forma_pago_id && form.forma_pago_id === 0 ? '1px solid red' : undefined
                                        }}
                                        onClick={() => updateField('forma_pago_id', formaPago.id)}
                                        variant={form.forma_pago_id === formaPago.id ? "contained" : "outlined"}
                                        disabled={isPending}
                                    >
                                        {formaPago.descripcion}
                                    </Button>
                                ))}
                            </Stack>



                            <NumericFormat
                                customInput={TextField}
                                thousandSeparator="."
                                decimalSeparator=","
                                placeholder="Ingresa monto"
                                name="monto"
                                onValueChange={(values) => {
                                    updateField('monto', Number(values.value));
                                }}
                                value={form.monto}
                                fullWidth
                                required
                                label="Ingresa monto"
                                error={(errors && errors.monto == 0) || excedeMonto}
                                helperText={
                                    (errors && errors.monto === 0) ? "Ingresa un monto válido" :
                                        excedeMonto ? `El monto no puede exceder ${montoAdeudado.toLocaleString("es-PY")}` :
                                            `Monto adeudado: ${montoAdeudado.toLocaleString("es-PY")}`
                                }
                                disabled={isPending}
                            />
                        </Stack>

                        <Stack mt={3} direction="row" justifyContent="flex-end" spacing={2}>
                            <Button
                                variant="outlined"
                                onClick={resetForm}
                                disabled={isPending}
                            >
                                Limpiar
                            </Button>
                            <Button
                                onClick={handleCobrar}
                                endIcon={<Icon name="cash-banknote" />}
                                disabled={isPending || excedeMonto}
                                variant="contained"
                            >
                                {isPending ? 'Procesando...' : 'Cobrar'}
                            </Button>
                        </Stack>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <Box component={Paper} boxShadow={4} borderRadius={4} padding={2}>
                        <Grid container spacing={1}>
                            <Grid size={12}>
                                <Typography variant="h6">Detalles del crédito</Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography variant="subtitle1">{credito.razon_social}</Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography variant="body2" fontWeight="bold">
                                    Monto total:
                                </Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography variant="body2" fontWeight="bold">
                                    {credito.monto.toLocaleString("es-PY")}
                                </Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography variant="body2" fontWeight="bold">
                                    Monto abonado:
                                </Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography variant="body2" fontWeight="bold" color="success.main">
                                    {credito.monto_abonado.toLocaleString("es-PY")}
                                </Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography variant="body2" fontWeight="bold">
                                    Monto adeudado:
                                </Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography variant="body2" fontWeight="bold" color="error.main">
                                    {montoAdeudado.toLocaleString("es-PY")}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Cobrar;