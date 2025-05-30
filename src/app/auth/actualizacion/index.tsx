import Icon from "@/components/ui/icon";
import { Button, Container, TextField } from "@mui/material";

function Actualizacion() {


    const refresh = () => {
        localStorage.clear()
        window.location.reload()
    }

    return <Container>
        <Button startIcon={<Icon>refresh</Icon>} onClick={() => refresh()}>Actualizar</Button>
        <TextField label="Codigo" />
    </Container>
}

export default Actualizacion;