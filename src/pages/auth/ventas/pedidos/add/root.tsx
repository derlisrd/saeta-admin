import { Button, Container, Grid2 as Grid, Icon, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import useHook from "./_hooks/useHook";

function Root() {
  const { handleModal, pedidos } = useHook();
  return (
    <Container>
      <Grid container>
        <Grid size={12}>
          <h3>Pedidos</h3>
        </Grid>
        <Grid size={12}>
          <Button onClick={() => handleModal("main", true)}>Continuar pedidos</Button>
        </Grid>
        <Grid size={12}>
          <h4>Pedidos en espera</h4>
        </Grid>
        <Grid size={12}>
          <List>
            {pedidos.map((pedido, i) => (
              <ListItem
                key={i}
                secondaryAction={
                  <IconButton edge="end" onClick={() => {}}>
                    <Icon>right</Icon>
                  </IconButton>
                }
              >
                <ListItemButton>
                  <ListItemText primary={pedido.total} secondary={"Pedido en espera"} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Root;
