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
            border: "none",
            color: "#000 !important",
            width: impresoraWidth,
            maxWidth: impresoraWidth,
            marginTop: "10px",
            background: "#fff",
          }}
        >
          <Barcode value={selectedProducto.codigo} height={36} fontSize={14} font="monospace" background="#ffffff" margin={0} textMargin={0} format="CODE128" />
          <span style={{ color: "#000", display: "block", fontFamily: "monospace", fontSize: 12 }}>{selectedProducto.precio_normal.toLocaleString("es-PY")}</span>
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
