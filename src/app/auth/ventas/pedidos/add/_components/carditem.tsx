import { AddPedidoItem } from "@/services/dto/pedidos/AddPedido";
import { Box } from "@mui/material";

interface CardItemProps {
    item: AddPedidoItem;
    removeItem: () => void;
}

function CardItem({ item }: CardItemProps) {
    return <Box>
        {item.codigo}
    </Box>
}

export default CardItem;