import Icon from "@/components/ui/icon";
import { useState } from "react";
import { Grid2 as Grid, TextField, InputAdornment, Tooltip, IconButton, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface FiltrosProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  buscar: (q: string) => void;
  search: string;
  refresh?: () => void;
  setDesde: React.Dispatch<React.SetStateAction<string>>;
  setHasta: React.Dispatch<React.SetStateAction<string>>;
  desde?: string;
  hasta?: string;
}

function Filtros({ setSearch, buscar, search, refresh, setDesde, setHasta, desde, hasta }: FiltrosProps) {
  // Estados temporales para los datepickers
  const [fechaDesde, setFechaDesde] = useState<dayjs.Dayjs | null>(desde ? dayjs(desde) : null);
  const [fechaHasta, setFechaHasta] = useState<dayjs.Dayjs | null>(hasta ? dayjs(hasta) : null);

  const handleBuscarClick = () => {
    // Aplicar filtros y refrescar los datos
    if (refresh) refresh();
  };

  const handleLimpiarFiltros = () => {
    setSearch("");
    setFechaDesde(null);
    setFechaHasta(null);
    setDesde("");
    setHasta("");
  };

  return (
    <Grid container p={1} spacing={1} alignItems="center">
      <Grid size={{ xs: 12, sm: 4, md: 3 }}>
        <TextField
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon size={14}>search</Icon>
                </InputAdornment>
              ),
            },
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              buscar(search);
            }
          }}
          value={search}
          placeholder="Buscar por razón social o documento..."
          onChange={({ target }) => setSearch(target.value)}
          fullWidth
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
              placeholder: "Fecha de inicio",
              sx: {
                padding: 0,
              }
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
      <Grid size={{ xs: 12, sm: 4, md: 3 }}>
        <Grid container spacing={1} alignItems="center">
          <Grid size={4}>
            <Tooltip title="Buscar" placement="top" arrow>
              <Button fullWidth onClick={handleBuscarClick}>
                <Icon>search</Icon>
              </Button>
            </Tooltip>
          </Grid>
          <Grid size={4}>
            <Tooltip title="Limpiar filtros" placement="top" arrow>
              <Button fullWidth variant="outlined" onClick={handleLimpiarFiltros}>
                <Icon>x</Icon>
              </Button>
            </Tooltip>
          </Grid>
          <Grid size={4}>
            <Tooltip title="Actualizar" placement="top" arrow>
              <IconButton onClick={refresh} color="primary">
                <Icon>refresh</Icon>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Filtros;
