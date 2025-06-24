import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";

function Cobrar() {
    const location = useLocation()

    console.log(location.state);
    return <Container>

    </Container>
}

export default Cobrar;