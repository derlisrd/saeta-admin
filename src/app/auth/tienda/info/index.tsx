import { Button, Card, CardActions, CardContent, Container, Grid, TextField, Typography } from "@mui/material";
import useOptionTienda from "./_hooks/useOptionTienda";

function InfoTienda() {
    const { data, isLoading } = useOptionTienda()

    console.log({ data, isLoading })
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
                                Logo de la tienda
                            </Typography>
                            <TextField fullWidth label="Nombre de tienda virtual" helperText="Máximo 12 caracteres" />
                        </CardContent>
                        <CardActions>
                            <Button>Guardar cambios</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
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
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Whatsapp
                            </Typography>
                            <TextField fullWidth label="Teléfono" helperText="Número de teléfono" />
                        </CardContent>
                        <CardActions>
                            <Button>Guardar cambios</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Teléfono
                            </Typography>
                            <TextField fullWidth label="Teléfono" helperText="Número de teléfono" />
                        </CardContent>
                        <CardActions>
                            <Button>Guardar cambios</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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