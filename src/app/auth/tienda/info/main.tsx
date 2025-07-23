import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import Title from "./containers/title";
import Descripcion from "./containers/descripcion";
import { useOptionsProvider } from "./provider";
import Telefono from "./containers/telefono";
import Direccion from "./containers/direccion";
import Whatsapp from "./containers/whatsapp";

function MainOptions() {
    const { isLoading, isPending } = useOptionsProvider()

    return (
        <Container>
            <Typography variant="h6">Información de tienda</Typography>
            {isLoading || isPending ? (
                <LinearProgress />
            ) : (
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Title />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Descripcion />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Telefono />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Direccion />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Whatsapp />
                    </Grid>
                </Grid>
            )}
        </Container>
    );
}

export default MainOptions;