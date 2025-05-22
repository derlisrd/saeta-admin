

import useBuscaProducto from "@/core/hooks/productos/stock/useBuscaProducto";
import { ProductoResults } from "@/services/dto/productos/producto";
import { Container, Grid2 as Grid, Box, Paper, Slide, Autocomplete, TextField } from "@mui/material";
import { useDeferredValue, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";


function EstadisticasProducto() {

    const [selectedProducto, setSelectedProducto] = useState<ProductoResults | null>(null);
    const [search, setSearch] = useState<string>("");

    const [fechaDesde, setFechaDesde] = useState<dayjs.Dayjs | null>(null);
    const [fechaHasta, setFechaHasta] = useState<dayjs.Dayjs | null>(null);
    const [hasta, setHasta] = useState<string>("");
    const [desde, setDesde] = useState<string>("");

    const deferredSearch = useDeferredValue(search);
    const { loadingBusqueda, listaBusqueda } = useBuscaProducto(deferredSearch);

    console.log(selectedProducto, desde, hasta);


    return <Container>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Box component={Paper} boxShadow={4} borderRadius={4} mb={6} padding={{ xs: 0, sm: 1, md: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={12}>

                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                        <Autocomplete
                            /* ref={autocompleteRef} */
                            onChange={(_, value) => {
                                value && setSelectedProducto(value);
                            }}
                            getOptionLabel={(option: ProductoResults) => `${option.codigo} - ${option.nombre}`}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            options={listaBusqueda}
                            loading={loadingBusqueda}
                            loadingText="Buscando..."
                            noOptionsText="No se encontraron resultados"
                            value={null}
                            renderInput={(params) => <TextField {...params} placeholder="Buscar producto..." onChange={(e) => setSearch(e.target.value)} value={search} />}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <DatePicker
                            label="Desde"
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
                    <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <DatePicker
                            label="Hasta"
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
                </Grid>
            </Box>
        </Slide>
    </Container>
}

export default EstadisticasProducto;