import Icon from "@/components/ui/icon";
import { Box, Container, Grid2 as Grid, Paper, Typography, TextField, InputAdornment, IconButton, Stack, Button } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { useLocation } from "react-router-dom";
import useCobrarCredito from "./_hooks/useCobrar";

function Cobrar() {
    const location = useLocation()
    const { formasPago, isLoading } = useCobrarCredito();

    const credito = location.state?.credito;
    console.info({ formasPago, isLoading });


    return <Container>
        <Grid container spacing={2}>
            <Grid size={12}>
                <Typography>Cobro de credito</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
                <Stack direction="row" spacing={1}>
                    {formasPago.map((e, i) => (
                        <Button
                            key={i}
                            size="small"
                            sx={{ fontSize: '0.65rem' }}
                            onClick={() => {

                            }}
                        /*  variant={formaPagoSelected === e.id ? "contained" : "outlined"} */


                        >
                            {e.descripcion}
                        </Button>
                    ))}
                </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <Box component={Paper} boxShadow={4} borderRadius={4} padding={{ xs: 1, md: 2 }}>
                    <NumericFormat
                        customInput={TextField}
                        thousandSeparator="."
                        decimalSeparator=","
                        placeholder="Monto abonado"
                        name="monto"
                        onValueChange={(e) => {
                            console.log(Number(e.value));
                            console.log(e.formattedValue);
                        }}
                        value={""}
                        fullWidth
                        required
                        label="Monto abonado"
                        slotProps={{
                            input: {
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => { }}>
                                            <Icon name="x" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <Box component={Paper} boxShadow={4} borderRadius={4} padding={{ xs: 1, md: 2 }}>
                    Detalles
                </Box>
            </Grid>
        </Grid>
    </Container>
}

export default Cobrar;