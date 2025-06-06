import Icon from "@/components/ui/icon";
import { Button, Grid2 as Grid, InputAdornment, TextField } from "@mui/material";
import useCategoria from "../useCategoria";

function Filtros() {
    const { handleModal } = useCategoria()
    return <Grid container alignItems="center" justifyContent='flex-end' spacing={2} my={2}>
        <Grid size={6}>
            <TextField
                fullWidth
                label="Buscar"
                placeholder="Buscar por nombre o codigo..."
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon>search</Icon>
                            </InputAdornment>
                        ),
                    },
                }}

            />
        </Grid>
        <Grid size={6}>
            <Button startIcon={<Icon>device-ipad-horizontal-plus</Icon>} onClick={() => { handleModal('crear') }}>
                Registrar
            </Button>
        </Grid>

    </Grid>
}

export default Filtros;