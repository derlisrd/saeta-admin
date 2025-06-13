import Icon from "@/components/ui/icon";
import { List, ListItem, ListItemIcon, ListItemText, Switch, Typography } from "@mui/material";

type PermisosMapeados = {
    id: number;
    permiso_id: number;
    modulo: string;
    accion: string;
    checked: boolean;
}

interface PermisoSelectableProps {
    permisosSelectables: PermisosMapeados[];
    onChangeCheckBox: (permisoId: number) => void;
}

function PermisoSelectables({ permisosSelectables, onChangeCheckBox }: PermisoSelectableProps) {
    return <List sx={{ width: "100%" }}>
        {permisosSelectables.map((i, e) => (
            <ListItem key={e}>
                <ListItemIcon>
                    <Icon name="key" />
                </ListItemIcon>
                <ListItemText
                    secondary={`Accion: ${i.accion}`}
                    primary={<Typography>Modulo: {i.modulo}</Typography>}
                />
                <Switch
                    checked={i.checked}
                    size="small"
                    onChange={() => onChangeCheckBox(i.id)}
                />
            </ListItem>
        ))}
    </List>
}

export default PermisoSelectables