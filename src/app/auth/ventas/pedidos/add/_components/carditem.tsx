import Icon from "@/components/ui/icon";
import { AddPedidoItem } from "@/services/dto/pedidos/AddPedido";
import { IconButton, Card, CardActions, CardContent, Typography } from "@mui/material";

interface CardItemProps {
    item: AddPedidoItem;
    removeItem: () => void;
}

function CardItem({ item, removeItem }: CardItemProps) {
    return <Card>
        <CardContent>
            <Typography gutterBottom variant="button">
                {item.nombre}
            </Typography>
            <Typography variant="body2">
                {item.cantidad} x {item.precio.toLocaleString("es-PY")}
            </Typography>
        </CardContent>
        <CardActions>
            <IconButton>
                <Icon name="photo-search" />
            </IconButton>
            <IconButton onClick={removeItem}>
                <Icon name="trash" />
            </IconButton>
        </CardActions>
    </Card>
    /* return (
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
    ); */
}

export default CardItem;
