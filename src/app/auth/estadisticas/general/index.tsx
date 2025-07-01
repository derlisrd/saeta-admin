
import { Container, Typography, Grid, Button, Stack, Alert, LinearProgress } from "@mui/material"
import useEstadisticasGeneral from "./_hooks/useEstadisticasGeneral";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CardEstadistica from "@/core/components/estadisticas/card.estadistica";
import ProductosMasVendidosLista from "./_components/productos";

function EstadisticasGeneral() {

    const { errorPeriodo, selectedDate, handleDateChange, handleConsultar, isLoading, periodo, productos } = useEstadisticasGeneral();


    return <Container>
        <Grid container spacing={2}>
            <Grid size={12}>
                <Typography variant="h6">Estadisticas por mes y año</Typography>
            </Grid>
            <Grid size={12}>
                {isLoading && <LinearProgress />}
            </Grid>
            <Grid size={12}>
                <Stack direction="row" spacing={2}>
                    <DatePicker
                        label="Seleccione periodo"
                        views={["month", "year"]}
                        value={selectedDate}
                        onChange={(date) => {
                            if (date) {
                                handleDateChange(date);
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleConsultar}
                        disabled={isLoading}
                    >Consultar</Button>
                </Stack>
            </Grid>
            {/* Mostrar error si existe */}
            {errorPeriodo && (
                <Grid size={12}>
                    <Alert severity="error">
                        Error al cargar las estadísticas: {errorPeriodo.message}
                    </Alert>
                </Grid>
            )}
            {
                periodo && (
                    <Grid size={12}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <CardEstadistica data={periodo.cantidad_pedidos} title="Cantidad de pedidos" icon="chart-infographic" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <CardEstadistica data={periodo.importe_final_total.toLocaleString("es-PY")} title="Importe vendido" icon="moneybag" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <CardEstadistica data={periodo.lucro_total.toLocaleString("es-PY")} title="Lucro total" icon="trending-up" />
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }

        </Grid>
        {
            productos && productos.productos &&
            <ProductosMasVendidosLista data={productos.productos} />
        }
    </Container>
}

export default EstadisticasGeneral