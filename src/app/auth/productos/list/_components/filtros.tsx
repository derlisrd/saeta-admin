import Icon from "@/components/ui/icon";
import { Grid, TextField, InputAdornment, Button, Stack } from "@mui/material";
import DepositoSelect from "./deposito.select";
import { useNavigate } from "react-router-dom";

interface FiltrosProps {
    setSearch: (search: string) => void;
    search: string;
    refresh: () => void;
}

function FiltrosProductos({ setSearch, refresh }: FiltrosProps) {
    const nav = useNavigate();

    return (
        <Grid container alignItems="center" justifyContent='flex-end' spacing={2} my={2}>
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
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
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Stack direction='row' gap={1}>
                    <Button startIcon={<Icon name='plus' />} onClick={() => nav("/productos/add")}>
                        nuevo
                    </Button>
                    <Button variant="outlined" endIcon={<Icon name='reload' />} onClick={() => refresh()}>recargar</Button>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default FiltrosProductos;