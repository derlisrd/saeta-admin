import { Container, Grid } from "@mui/material";
import Title from "./containers/title";

function MainOptions() {


    return <Container>
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Title />
            </Grid>
        </Grid>
    </Container>
}

export default MainOptions;