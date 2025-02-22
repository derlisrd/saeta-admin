import { homeMock } from "@/mocks/home";
import { Box, Card, CardContent, Container, Grid2 as Grid, Icon, Stack, Typography } from "@mui/material";

function Home() {
  return (
    <Container>
      <h3>Vision general</h3>
      <Grid spacing={2} container>
        {homeMock.map((e, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ boxShadow: 4 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h5">{e.value}</Typography>
                    <Typography variant="caption">{e.label}</Typography>
                  </Box>
                  <Icon sx={{ fontSize: 32 }}>{e.icon}</Icon>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
