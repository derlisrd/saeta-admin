import Icon from "@/components/ui/icon";
import { AddPedidoItem } from "@/services/dto/pedidos/AddPedido";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";

interface CardItemProps {
    item: AddPedidoItem;
    removeItem: () => void;
}

function CardItem({ item, removeItem }: CardItemProps) {
    return (
        <List sx={{ width: '100%', borderRadius: 3, boxShadow: 4 }} >
            <ListItem
                secondaryAction={
                    <IconButton edge="end" onClick={removeItem}>
                        <Icon>trash</Icon>
                    </IconButton>
                }
            >
                <ListItemText primary={item.nombre} secondary={`${item.cantidad} x ${item.precio.toLocaleString("es-PY")}`} />
            </ListItem>
        </List>
    );
}

export default CardItem;
