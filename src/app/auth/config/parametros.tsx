import Icon from "@/components/ui/icon";
import { parametros } from "@/constants/parametros";
import { Avatar, Box, Breadcrumbs, Card, CardContent, Container, Grid2 as Grid, Slide, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Parametros() {
  return (
    <Container>
      <Breadcrumbs separator="›">
        <Typography variant="overline">Configuración</Typography>
        <Typography variant="overline">Parámetros</Typography>
      </Breadcrumbs>

      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Grid container spacing={2}>
          {parametros.map((e, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={i}>
              <Link to={e.url} style={{ textDecoration: "none" }}>
                <Card>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box>
                        <Avatar sx={{ width: 48, height: 48, bgcolor: "primary.light" }}>
                          <Icon size={24} name={e.icon} />
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
      </Slide>
    </Container>
  );
}

export default Parametros;
