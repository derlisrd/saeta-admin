import Icon from "@/components/ui/icon";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AgregarActions() {
    const nav = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <Icon name="chevron-down" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => nav("/ventas/pedidos/add")}>
                    <ListItemIcon>
                        <Icon name="shopping-cart-plus" />
                    </ListItemIcon>
                    Nuevo pedido
                </MenuItem>
                <MenuItem onClick={() => nav("/productos/add")}>
                    <ListItemIcon>
                        <Icon name="shopping-bag-plus" />
                    </ListItemIcon>
                    Nuevo producto
                </MenuItem>
                <MenuItem onClick={() => nav("/clientes/add")}>
                    <ListItemIcon>
                        <Icon name="user-plus" />
                    </ListItemIcon>
                    Nuevo cliente
                </MenuItem>
            </Menu>
        </div>
    );
}
