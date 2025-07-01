import { Box, Button, Fade, Grid, TextField } from "@mui/material";
import { useConfigContext } from "../_provider/provider";


function Form1() {

    const { } = useConfigContext()

    return <Fade in={true} timeout={1200}>
        <Grid container spacing={3}>
            <Grid size={12}>
                <TextField autoFocus autoComplete="off" label="Nombre de empresa o razon social" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField autoComplete="off" label="Propietario o representante" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField autoComplete="off" label="Ruc o documento" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField autoComplete="off" label="Telefono" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField autoComplete="off" label="Direccion" fullWidth />
            </Grid>
            <Grid size={12}>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 2
                }}>
                    <Button>Continuar</Button>
                </Box>

            </Grid>
        </Grid>
    </Fade>
}

export default Form1;