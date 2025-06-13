import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Switch, Typography } from "@mui/material";
import { useUserProvider } from "../provider";
import Icon from "@/components/ui/icon";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import API from "@/services/api";
import { set } from "react-hook-form";
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

    console.log(permisosOtorgados);
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