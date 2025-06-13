import Icon from "@/components/ui/icon";
import { Button, Container, TextField } from "@mui/material";

function Actualizacion() {


    const refresh = () => {
        localStorage.clear()
        window.location.reload()
    }

    return <Container>
        <Button startIcon={<Icon name='refresh' />} onClick={() => refresh()}>Actualizar</Button>
        <Button variant="outlined">Outlined</Button>
        <Button color='secondary' startIcon={<Icon name='refresh' />} onClick={() => refresh()}>Actualizar</Button>
        <Button color='secondary' variant="outlined">Outlined</Button>
        <TextField label="Codigo" />
    </Container>
}

export default Actualizacion;