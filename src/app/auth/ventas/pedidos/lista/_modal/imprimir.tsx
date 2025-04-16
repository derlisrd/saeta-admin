import Icon from "@/components/ui/icon";
import { PedidosDelDiaResults } from "@/services/dto/pedidos/pedidosDelDia";
import { format } from "@formkit/tempo";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";

interface ImprimirModalProps {
  open: boolean;
  selectedRow: PedidosDelDiaResults | null;
  onClose: () => void;
}

function ImprimirModal({ open, selectedRow, onClose }: ImprimirModalProps) {
  if (!selectedRow) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Imprimir pedido
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Icon>x</Icon>
      </IconButton>
      <DialogContent>
        <div>
          <Typography variant="body1" color="gray">
            {format(selectedRow.created_at, "DD-MM-YYYY")}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {selectedRow.razon_social}
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button>Imprimir</Button>
        <Button onClick={onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImprimirModal;
