import { Button, Card, CardActions, CardContent, Container, Grid, Stack, TextField, Typography } from "@mui/material";

function InfoTienda() {
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Typography variant="h5">Información de la tienda virtual</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Nombre de tienda virtual
                            </Typography>
                            <TextField fullWidth label="Nombre de tienda virtual" helperText="Máximo 12 caracteres" />
                        </CardContent>
                        <CardActions>
                            <Button>Guardar cambios</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Descripción
                            </Typography>
                            <TextField fullWidth label="Descripción" multiline rows={2} helperText="Máximo 120 caracteres" />
                        </CardContent>
                        <CardActions>
                            <Button>Guardar cambios</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Dirección de la tienda
                            </Typography>
                            <TextField fullWidth label="Dirección" helperText="Máximo 100 caracteres" />
                        </CardContent>
                        <CardActions>
                            <Button>Guardar cambios</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default InfoTienda;