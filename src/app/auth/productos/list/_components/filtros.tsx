import Icon from "@/components/ui/icon";
import { Grid2 as Grid, TextField, InputAdornment, Button, IconButton, Tooltip } from "@mui/material";
import DepositoSelect from "./deposito.select";
import { useNavigate } from "react-router-dom";

interface FiltrosProps {
    setSearch: (search: string) => void;
    search: string;
    refresh: () => void;
}

function FiltrosProductos({
    setSearch, refresh }: FiltrosProps) {
    const nav = useNavigate();

    return (
        <Grid container alignItems="center" justifyContent='flex-end' spacing={2} my={2}>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <TextField
                    fullWidth
                    label="Buscar"
                    placeholder="Buscar por nombre o codigo..."
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Icon name="search" />
                                </InputAdornment>
                            ),
                        },
                    }}
                    onChange={({ target }) => setSearch(target.value)}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <DepositoSelect />
            </Grid>
            <Grid size={{ xs: 6, sm: 6, md: 2 }}>
                <Button startIcon={<Icon name='device-ipad-horizontal-plus' />} onClick={() => nav("/productos/add")}>
                    Registrar
                </Button>
            </Grid>
            <Grid size={{ xs: 6, sm: 6, md: 1 }}>
                <Tooltip title="Actualizar" placement="top" arrow>
                    <IconButton onClick={() => refresh()}>
                        <Icon name="refresh" />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    );
}

export default FiltrosProductos;