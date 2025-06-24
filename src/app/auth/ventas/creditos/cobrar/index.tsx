import Icon from "@/components/ui/icon";
import { Box, Container, Grid2 as Grid, Paper, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { useLocation } from "react-router-dom";

function Cobrar() {
    const location = useLocation()


    return <Container>
        <Grid container spacing={2}>
            <Grid size={12}>
                <Typography>Cobro de credito</Typography>
            </Grid>
            <Grid size={12}>
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
        </Grid>
    </Container>
}

export default Cobrar;