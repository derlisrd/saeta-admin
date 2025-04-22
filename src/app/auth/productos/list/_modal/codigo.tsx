import Icon from "@/components/ui/icon";
import Barcode from "react-barcode";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ProductoResults } from "@/services/dto/productos/producto";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useAuth } from "@/providers/AuthProvider";

interface PrintCodigoModalProps {
  open: boolean;
  onClose: () => void;
  selectedProducto: ProductoResults | null;
}

function PrintCodigoModal({ open, onClose, selectedProducto }: PrintCodigoModalProps) {
  if (!selectedProducto) return null;

  const { userData } = useAuth();
  const contentRef = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({ contentRef, ignoreGlobalStyles: true });
  const impresoraWidth = userData?.impresoras?.[0]?.mm ? `${userData.impresoras[0].mm}mm` : "100%";

  return (
    <Dialog open={open} onClose={onClose} disableRestoreFocus>
      <DialogContent>
        <div
          ref={contentRef}
          style={{
            fontFamily: "monospace",
            textAlign: "center",
            border: "1px solid black",
            color: "#000 !important",
            width: impresoraWidth,
            maxWidth: impresoraWidth,
            marginTop: "10px",
          }}
        >
          <Barcode value={selectedProducto.codigo} font="monospace" background="#ffffff" format="CODE128" />
        </div>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<Icon>printer</Icon>} color="primary" onClick={() => print()}>
          Imprimir
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PrintCodigoModal;
