import { IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import useHook from "../_hooks/useHook";
import Icon from "@/components/ui/icon";

function ListaDeEspera() {
  const { setIndex, pedidos, index, cancelar } = useHook();
  return (
    <List>
      {pedidos.length > 1 &&
        pedidos.map((pedido, i) => (
          <ListItem
            key={i}
            secondaryAction={
              <IconButton edge="end" onClick={cancelar}>
                <Icon>check</Icon>
              </IconButton>
            }
          >
            <ListItemButton onClick={() => setIndex(i)} selected={i === index}>
              <ListItemText primary={pedido.total} secondary={i === index ? "Pedido actual" : "Pedido en espera"} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
}

export default ListaDeEspera;
