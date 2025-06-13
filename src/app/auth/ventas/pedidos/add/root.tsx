import { Button, Container, Grid2 as Grid, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import useHook from "./_hooks/useHook";
import useModal from "./_hooks/useModal";
import Icon from "@/components/ui/icon";

function Root() {
  const { pedidos } = useHook();
  const { handleModal } = useModal();
  return (
    <Container>
      <Grid container>
        <Grid size={12}>
          <h3>Pedidos</h3>
        </Grid>
        <Grid size={12}>
          <Button onClick={() => handleModal("main")} endIcon={<Icon name='arrow-narrow-right-dashed' />}>
            Continuar pedidos
          </Button>
        </Grid>
        {pedidos.length > 1 && (
          <>
            <Grid size={12}>
              <h4>Pedidos en espera</h4>
            </Grid>
            <Grid size={12}>
              <List>
                {pedidos.map((pedido, i) => (
                  <ListItem
                    key={i}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => { }}>
                        <Icon size={22} name="check" />
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
          </>
        )}
      </Grid>
    </Container>
  );
}

export default Root;
