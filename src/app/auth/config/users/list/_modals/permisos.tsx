import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress } from "@mui/material";
import { useUserProvider } from "../provider";
import Icon from "@/components/ui/icon";
import { useEffect, useMemo, useState } from "react";
import useQueryPermisos from "../_hooks/useQueryPermisos";
import PermisoSelectables from "../_components/permisoselectables";
import useSendPermisos from "../_hooks/useSendPermisos";



type PermisosMapeados = {
    id: number;
    permiso_id: number;
    modulo: string;
    accion: string;
    checked: boolean;
}


function PermisosModal() {


    const { modals, handleModals, selectedUser, setSelectedUser, permisos } = useUserProvider()
    const { permisosOtorgados, isLoading } = useQueryPermisos(!!selectedUser && modals.permisos, selectedUser ? selectedUser.id : 0)
    const [permisosSelected, setPermisosSelected] = useState<PermisosMapeados[]>([]);

    const { sendPermisos, isPending } = useSendPermisos()

    const close = () => { setSelectedUser(null); handleModals('permisos'); }

    const permisosIniciales = useMemo(() => {
        if (!permisosOtorgados || !permisos) return [];
        return permisos.map((i) => ({
            id: i.id,
            permiso_id: i.id,
            modulo: i.modulo,
            accion: i.accion,
            user_id: selectedUser ? selectedUser.id : 0,
            checked: permisosOtorgados.some((j) => j.permiso_id === i.id),
        }));
    }, [permisosOtorgados, permisos, selectedUser]);

    const enviarPermisos = () => {
        if (!selectedUser) return;
        sendPermisos(permisosIniciales, permisosSelected, selectedUser.id);
    }

    // Función para manejar el cambio de checkbox
    const handleCheckboxChange = (permisoId: number) => {
        setPermisosSelected(prev => prev.map(permiso => permiso.id === permisoId ? { ...permiso, checked: !permiso.checked } : permiso));
    }

    useEffect(() => {
        if (permisosIniciales.length > 0) {
            setPermisosSelected(permisosIniciales);
        }
    }, [permisosIniciales]);

    return <Dialog maxWidth='xs' open={modals.permisos} onClose={close}>
        <DialogTitle>Permisos</DialogTitle>
        <DialogContent>
            {(isLoading || isPending) ? <LinearProgress /> :
                <PermisoSelectables permisosSelectables={permisosSelected} onChangeCheckBox={handleCheckboxChange} />
            }
        </DialogContent>
        <DialogActions>
            <Button
                variant="outlined"
                startIcon={<Icon name='arrow-narrow-left-dashed' />}
                onClick={close}
            >
                Regresar
            </Button>
            <Button onClick={enviarPermisos} endIcon={<Icon name='device-floppy' />}>
                Guardar
            </Button>
        </DialogActions>
    </Dialog>


}

export default PermisosModal;