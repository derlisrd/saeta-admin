import Icon from "@/components/ui/icon";
import { List, ListItem, IconButton, ListItemText } from "@mui/material";
import useHook from "../_hooks/useHook";

function ListaFormaPago() {
  const { pedidos, index, handleFormasPago } = useHook();

  return (
    <List>
      {pedidos[index].formas_pagos.map((formaPago, i) => (
        <ListItem
          key={i}
          sx={{ borderBottom: "1px solid #ccc", borderRadius: 0 }}
          secondaryAction={
            <IconButton
              onClick={() => {
                handleFormasPago(0, formaPago.id, "remove");
              }}
            >
              <Icon>trash</Icon>
            </IconButton>
          }
        >
          <ListItemText primary={formaPago.abreviatura} secondary={formaPago.monto.toLocaleString("es-PY")} />
        </ListItem>
      ))}
    </List>
  );
}

export default ListaFormaPago;
