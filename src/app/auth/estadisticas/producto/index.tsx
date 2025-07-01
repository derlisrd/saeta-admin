

import useBuscaProducto from "@/core/hooks/productos/stock/useBuscaProducto";
import { ProductoResults } from "@/services/dto/productos/producto";
import { Container, Grid, Box, Paper, Slide, Autocomplete, TextField, Typography, Button, LinearProgress } from "@mui/material";
import { useDeferredValue, useRef, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import useEstadisticasPorProducto from "@/core/hooks/estadisticas/useEstadisticasPorProducto";
import Icon from "@/components/ui/icon";
import Datos from "./_components/datos";
import GenericTable from "@/components/table/GenericTable";
import { columnsconfig } from "./_components/configcolumns";




function EstadisticasProducto() {

    const [selectedProducto, setSelectedProducto] = useState<ProductoResults | null>(null);
    const [search, setSearch] = useState<string>("");

    const [fechaDesde, setFechaDesde] = useState<dayjs.Dayjs | null>(null);
    const [fechaHasta, setFechaHasta] = useState<dayjs.Dayjs | null>(null);
    const [hasta, setHasta] = useState<string>("");
    const [desde, setDesde] = useState<string>("");

    const autocompleteRef = useRef<any>(null);

    const deferredSearch = useDeferredValue(search);
    const { loadingBusqueda, listaBusqueda } = useBuscaProducto(deferredSearch);
    const { send, data, isPending } = useEstadisticasPorProducto()

    const handleSend = () => {
        if (selectedProducto && fechaDesde && fechaHasta) {
            send(selectedProducto.id, desde, hasta);
        }
        setSearch('')
    }
    const clear = () => {
        setSelectedProducto(null);
        setSearch("");
        setDesde("");
        setHasta("");
        setFechaDesde(null);
        setFechaHasta(null);
    };


    return (
        <Container maxWidth='xl'>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Box component={Paper} boxShadow={4} borderRadius={4} padding={{ xs: 1, md: 2 }}>
                    <Grid container spacing={2} alignItems='center' mb={1}>
                        <Grid size={12}>
                            <Typography variant="body2">Seleccione el producto y el rango de fecha</Typography>
                            {isPending && <LinearProgress />}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                            <Autocomplete
                                ref={autocompleteRef}
                                onChange={(_, value) => {
                                    value && setSelectedProducto(value);
                                }}
                                getOptionLabel={(option: ProductoResults) => `${option.codigo} - ${option.nombre}`}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                options={listaBusqueda}
                                loading={loadingBusqueda}
                                loadingText="Buscando..."
                                noOptionsText="No se encontraron resultados"
                                value={selectedProducto}
                                renderInput={(params) => <TextField {...params} placeholder="Buscar producto..." onChange={(e) => setSearch(e.target.value)} value={search} />}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <DatePicker
                                label="Desde"
                                disabled={selectedProducto === null}
                                value={fechaDesde}
                                onChange={(date) => {
                                    setFechaDesde(date);
                                    setDesde(date ? date.format("YYYY-MM-DD") : "");
                                    // No hacemos refresh automáticamente para permitir que el usuario seleccione ambas fechas
                                }}
                                format="DD-MMM-YYYY"
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                    },
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <DatePicker
                                label="Hasta"
                                disabled={selectedProducto === null}
                                value={fechaHasta}
                                onChange={(date) => {
                                    setFechaHasta(date);
                                    setHasta(date ? date.format("YYYY-MM-DD") : "");
                                    // No hacemos refresh automáticamente para permitir que el usuario seleccione ambas fechas
                                }}
                                format="DD-MMM-YYYY"
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                    },
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                            <Button onClick={handleSend} disabled={selectedProducto === null} fullWidth endIcon={<Icon name='report-search' />}>
                                Consulta
                            </Button>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                            <Button variant="outlined" fullWidth onClick={clear} endIcon={<Icon name='trash' />}>
                                Limpiar
                            </Button>
                        </Grid>
                        <Grid size={12}>
                            {data && data.results && <Datos data={data.results} />}
                        </Grid>
                    </Grid>
                    <GenericTable minHeight={320} data={data && data.results ? data.results.ventas : []} columns={columnsconfig()} rowHeight={40} headerHeight={36} />
                </Box>
            </Slide>

        </Container>
    );
}

export default EstadisticasProducto;