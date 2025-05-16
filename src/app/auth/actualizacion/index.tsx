import Icon from "@/components/ui/icon";
import { Button, Container } from "@mui/material";

function Actualizacion() {


    const refresh = () => {
        localStorage.clear()
        window.location.reload()
    }

    return <Container>
        <Button startIcon={<Icon>refresh</Icon>} onClick={() => refresh()}>Actualizar</Button>
    </Container>
}

export default Actualizacion;