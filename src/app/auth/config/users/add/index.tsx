import { Box, Container, Grid2 as Grid, LinearProgress, Slide, TextField } from "@mui/material";

function AddUsuario() {
  return (
    <Container>
      <Slide direction="down" unmountOnExit mountOnEnter in>
        <Box>
          <Grid container spacing={2}>
            <Grid size={12}>
              <LinearProgress />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField label="Nombre" />
            </Grid>
          </Grid>
        </Box>
      </Slide>
    </Container>
  );
}

export default AddUsuario;
