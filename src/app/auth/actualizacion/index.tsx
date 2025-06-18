import Icon from "@/components/ui/icon";
import { Button, Container, Stack, TextField, Grid2 as Grid } from "@mui/material";

function Actualizacion() {


    const refresh = () => {
        localStorage.clear()
        window.location.reload()
    }

    return <Container>
        <Grid container spacing={1}>
            <Grid size={6}>
                <Button startIcon={<Icon name='refresh' />} onClick={() => refresh()}>Actualizar</Button>
            </Grid>
            <Grid size={6}>
                <Button variant="outlined">Outlined</Button>
            </Grid>
            <Grid size={6}>
                <Button color='secondary' startIcon={<Icon name='refresh' />} onClick={() => refresh()}>Actualizar</Button>
            </Grid>
            <Grid size={6}>
                <Button color='secondary' variant="outlined">Outlined</Button>
            </Grid>
            <Grid size={6}>
                <TextField label="Codigo" />
            </Grid>
        </Grid>
    </Container>
}

export default Actualizacion;