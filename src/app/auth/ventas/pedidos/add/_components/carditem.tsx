import { AddPedidoItem } from "@/services/dto/pedidos/AddPedido";
import { Box, Typography } from "@mui/material";

interface CardItemProps {
    item: AddPedidoItem;
    removeItem: () => void;
}

function CardItem({ item }: CardItemProps) {
    return <Box sx={{ backgroundColor: 'background.default', p: 2, width: '100%', height: '100%' }}>
        <Typography variant='caption'>{item.nombre}</Typography>
    </Box>
}

export default CardItem;