import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useListaPedidosContext } from "../provider";

function FiltrosModal() {
    const { modals, handleModals } = useListaPedidosContext()
    return (
        <Dialog open={modals.filtros} onClose={() => handleModals("filtros")}>
            <DialogTitle>Filtros</DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
                <Button onClick={() => handleModals("filtros")}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default FiltrosModal;