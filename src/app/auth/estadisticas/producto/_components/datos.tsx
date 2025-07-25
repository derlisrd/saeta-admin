import { EstadisticasProductoResults } from "@/services/dto/estadisticas/producto";
import { Alert, Grid, Typography } from "@mui/material";

function Datos({ data }: { data: EstadisticasProductoResults }) {
    return <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 3 }}>
            <Alert icon={false} variant="outlined">
                <Typography variant="body2">
                    Cantidad vendida: {data.cantidad}
                </Typography>
            </Alert>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }} >
            <Alert severity="info" variant="outlined" icon={false}>
                <Typography variant="body2">
                    Lucro: {data.lucro.toLocaleString('es-PY')}
                </Typography>
            </Alert>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }} >
            <Alert severity="warning" variant="outlined" icon={false}>
                <Typography variant="body2">
                    Costo total: {data.costo.toLocaleString('es-PY')}
                </Typography>
            </Alert>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }} >
            <Alert severity="warning" variant="outlined" icon={false}>
                <Typography variant="body2">
                    Total: {data.total.toLocaleString('es-PY')}
                </Typography>
            </Alert>
        </Grid>
    </Grid>
}

export default Datos;