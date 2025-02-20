import { parametros } from "@/constants/parametros";
import { Avatar, Box, Breadcrumbs, Card, CardContent, Container, Grid2 as Grid, Icon, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Parametros() {
  return (
    <Container>
      <h3>Parámetros</h3>
      <Breadcrumbs separator="›">
        <Typography variant="overline">Parámetros</Typography>
      </Breadcrumbs>

      <Grid container spacing={2}>
        {parametros.map((e, i) => (
          <Grid size={{ xs: 12, sm: 4 }} key={i}>
            <Link to={e.url} style={{ textDecoration: "none" }}>
              <Card>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box>
                      <Avatar sx={{ width: 48, height: 48, bgcolor: "primary.light" }}>
                        <Icon fontSize="large">{e.icon}</Icon>
                      </Avatar>
                    </Box>
                    <Box>
                      <Typography variant="overline" display="block">
                        {e.title}
                      </Typography>
                      <Typography variant="caption">{e.subtitle}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Parametros;
