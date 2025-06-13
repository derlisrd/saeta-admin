import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Switch, Typography } from "@mui/material";
import { useUserProvider } from "../provider";
import Icon from "@/components/ui/icon";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import API from "@/services/api";
import useQueryPermisos from "../_hooks/useQueryPermisos";


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

    console.log(permisosIniciales)

    const close = () => { setSelectedUser(null); handleModals('permisos'); }

    return <Dialog maxWidth='xs' open={modals.permisos} onClose={close}>
        <DialogTitle>Permisos</DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
            <Button
                variant="outlined"
                startIcon={<Icon name='arrow-narrow-left-dashed' />}
                onClick={close}
            >
                Regresar
            </Button>
            <Button onClick={() => { }} endIcon={<Icon name='device-floppy' />}>
                Guardar
            </Button>
        </DialogActions>
    </Dialog>


}

export default PermisosModal;