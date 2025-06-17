import { Container, Grid2 as Grid } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

function Details() {

    const { id } = useParams();
    const location = useLocation();
    const { producto } = location.state || {}


    return <Container>
        <Grid container spacing={2}>
            <Grid size={12}>

            </Grid>
        </Grid>
    </Container>
}

export default Details;