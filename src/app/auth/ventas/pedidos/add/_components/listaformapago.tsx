import Icon from "@/components/ui/icon";
import { List, ListItem, IconButton, ListItemText } from "@mui/material";
import useHook from "../_hooks/useHook";

function ListaFormaPago() {
  const { pedidos, index } = useHook();
  return (
    <List>
      {pedidos[index].formas_pagos.map((formaPago, i) => (
        <ListItem
          key={i}
          secondaryAction={
            <IconButton edge="end">
              <Icon>trash</Icon>
            </IconButton>
          }
        >
          <ListItemText primary={formaPago.abreviatura} secondary={formaPago.monto} />
        </ListItem>
      ))}
    </List>
  );
}

export default ListaFormaPago;
