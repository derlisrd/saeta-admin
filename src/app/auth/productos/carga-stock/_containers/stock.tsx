// src/components/Stock/StockForm.tsx
import { DepositoResults } from "@/services/dto/productos/deposito";
import { ProductoResults } from "@/services/dto/productos/producto";
import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useRef } from "react";

interface StockFormProps {
  depositos: DepositoResults[];
  listaBusqueda: ProductoResults[];
  search: string;
  selectedDeposito: number;
  selectedProducto: ProductoResults | null;
  loadingBusqueda: boolean;
  isLoading: boolean;
  onDepositoChange: (id: number) => void;
  onProductoChange: (producto: ProductoResults | null) => void;
  onSearchChange: (search: string) => void;
  onConsultar: () => void;
  validarFormulario: () => boolean;
}

function StockForm({
  depositos,
  listaBusqueda,
  search,
  selectedDeposito,
  loadingBusqueda,
  isLoading,
  onDepositoChange,
  onProductoChange,
  onSearchChange,
  onConsultar,
  validarFormulario,
}: StockFormProps) {
  const autocompleteRef = useRef<any>(null);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 12, sm: 4, md: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="deposito-select-label">Depósito</InputLabel>
          <Select
            fullWidth
            labelId="impuesto-label"
            id="impuesto"
            onChange={(e) => onDepositoChange(Number(e.target.value))}
            value={selectedDeposito}
            label="Deposito"
            name="deposito_id"
            disabled={isLoading}
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
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 4, md: 4 }}>
        <Autocomplete
          ref={autocompleteRef}
          onChange={(_, value) => {
            value && onProductoChange(value);
          }}
          getOptionLabel={(option: ProductoResults) => `${option.codigo} - ${option.nombre}`}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          options={listaBusqueda}
          loading={loadingBusqueda}
          loadingText="Buscando..."
          noOptionsText="No se encontraron resultados"
          value={null}
          renderInput={(params) => <TextField {...params} placeholder="Buscar producto..." onChange={(e) => onSearchChange(e.target.value)} value={search} />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4, md: 4 }}>
        <Button
          onClick={() => {
            if (validarFormulario()) {
              onConsultar();
            }
          }}
          disabled={isLoading}
        >
          Consultar
        </Button>
      </Grid>
    </Grid>
  );
}

export default StockForm;
