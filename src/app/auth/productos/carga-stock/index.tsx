import useBuscaProducto from "@/core/hooks/productos/stock/useBuscaProducto";
import useCargaStock from "@/core/hooks/productos/stock/useCargaStock";
import { DepositoResults } from "@/services/dto/productos/deposito";
import { ProductoResults } from "@/services/dto/productos/producto";
import { Autocomplete, Container, FormControl, FormHelperText, Grid2 as Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState, useDeferredValue } from "react";

function CargaStock() {
  const { depositos } = useCargaStock();
  const [selectedDeposito, setSelectedDeposito] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const deferredSearch = useDeferredValue(search);
  const { loadingBusqueda, listaBusqueda } = useBuscaProducto(deferredSearch);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={12}>
          <h4>Seleccione el depósito y ingrese la cantidad del producto</h4>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="deposito-select-label">Depósito</InputLabel>
            <Select
              fullWidth
              labelId="impuesto-label"
              id="impuesto"
              onChange={(e) => setSelectedDeposito(Number(e.target.value))}
              value={selectedDeposito}
              label="Deposito"
              name="deposito_id"
            >
              <MenuItem value={0} disabled>
                Seleccionar deposito
              </MenuItem>
              {depositos.map((item: DepositoResults, index: number) => (
                <MenuItem key={index} value={item.id}>
                  {item.nombre}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Selecciona el depósito</FormHelperText>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            onChange={(_, value) => {
              //setChangeValue({ label: value?.label || "", id: value?.id || 0 });
            }}
            // Agregamos esta función para convertir cada opción a texto
            getOptionLabel={(option: ProductoResults) => `${option.codigo} - ${option.nombre}`}
            // Opcional: Clave única para cada opción
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={listaBusqueda}
            loading={loadingBusqueda}
            loadingText="Buscando..."
            noOptionsText="No se encontraron resultados"
            renderInput={(params) => <TextField {...params} placeholder="Buscar producto..." onChange={(e) => setSearch(e.target.value)} value={search} />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CargaStock;
