import Icon from "@/components/ui/icon";
import Printable from "@/core/components/pedidos/printable";
import { useAuth } from "@/providers/AuthProvider";
import { PedidosDelDiaResults } from "@/services/dto/pedidos/pedidosDelDia";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface ImprimirModalProps {
  open: boolean;
  selectedRow: PedidosDelDiaResults | null;
  onClose: () => void;
}

function ImprimirModal({ open, selectedRow, onClose }: ImprimirModalProps) {
  if (!selectedRow) return null;

  const { userData } = useAuth();

  const impresoraWidth = userData?.impresoras?.[0]?.mm ? `${userData.impresoras[0].mm}mm` : "100%";
  const contentRef = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({ contentRef, ignoreGlobalStyles: true });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Imprimir pedido
      </DialogTitle>
      <IconButton
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
        <div ref={contentRef} style={{ fontFamily: "monospace", color: "#000 !important", width: impresoraWidth, maxWidth: impresoraWidth, margin: "0 auto" }}>
          <Printable empresa={userData && userData.empresa} pedido={selectedRow} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => print()} startIcon={<Icon>printer</Icon>}>
          Imprimir
        </Button>
        <Button onClick={onClose} variant="outlined" startIcon={<Icon>x</Icon>}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImprimirModal;
