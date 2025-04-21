import Icon from "@/components/ui/icon";
import { Grid2 as Grid, TextField, InputAdornment, Tooltip, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
interface FiltrosProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  buscar: (q: string) => void;
  search: string;
  refresh?: () => void;
  setDesde: React.Dispatch<React.SetStateAction<string>>;
  setHasta: React.Dispatch<React.SetStateAction<string>>;
}

function Filtros({ setSearch, buscar, search, refresh, setDesde, setHasta }: FiltrosProps) {
  return (
    <Grid container p={1} spacing={1} alignItems="center">
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon size={18}>search</Icon>
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
          placeholder="Buscar..."
          onChange={({ target }) => setSearch(target.value)}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <DatePicker
          onChange={(e) => {
            setDesde(e ? e.format("YYYY-MM-DD") : "");
            setHasta(e ? e.format("YYYY-MM-DD") : "");
          }}
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Tooltip title="Actualizar" color="primary" placement="top" arrow>
          <IconButton onClick={refresh}>
            <Icon>refresh</Icon>
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default Filtros;
