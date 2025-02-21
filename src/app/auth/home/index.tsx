import { Card, CardContent, Container, Grid2 as Grid, Typography } from "@mui/material";

function Home() {
  return (
    <Container>
      <h3>Vision general</h3>
      <Grid spacing={2} container>
        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <Card sx={{ boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h5">1.200</Typography>
              <Typography variant="caption">Esta semana</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
