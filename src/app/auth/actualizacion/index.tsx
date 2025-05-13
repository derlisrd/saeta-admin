import Icon from "@/components/ui/icon";
import { Button, Container } from "@mui/material";

function Actualizacion() {
    return <Container>
        <Button startIcon={<Icon>refresh</Icon>} onClick={()=> window.location.reload()}>Actualizar</Button>
    </Container>
}

export default Actualizacion;