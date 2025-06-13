import Icon from "@/components/ui/icon";
import Barcode from "react-barcode";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Dialog, DialogActions, DialogContent, Grid2 as Grid } from "@mui/material";
import { useAuth } from "@/providers/AuthProvider";
import { useProductosLista } from "../provider";



function PrintCodigoModal() {
  const { userData } = useAuth();
  const { modals, handleModals, selectedProducto } = useProductosLista()






  const contentRef = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({ contentRef, ignoreGlobalStyles: true });
  const impresoraWidth = userData?.impresoras?.[0]?.mm ? `${userData.impresoras[0].mm}mm` : "100%";

  if (!selectedProducto) return <></>;

  return (
    <Dialog open={modals.codigo} onClose={() => handleModals("codigo")} disableRestoreFocus>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <div
              ref={contentRef}
              style={{
                fontFamily: "monospace",
                textAlign: "center",
                border: "none",
                color: "#000 !important",
                width: impresoraWidth,
                maxWidth: impresoraWidth,
                marginTop: "10px auto",
                background: "#fff",
                borderRadius: "4px",
              }}
            >
              <Barcode value={selectedProducto.codigo} height={36} fontSize={14} font="monospace" background="#ffffff" margin={0} marginTop={2} textMargin={0} format="CODE128" />
              <span style={{ color: "#000", display: "block", fontFamily: "monospace" }}>{selectedProducto.precio_normal.toLocaleString("es-PY")}</span>
            </div>
          </Grid>
          <Grid size={12}></Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<Icon name='printer' />} color="primary" onClick={() => print()}>
          Imprimir
        </Button>
        <Button variant="outlined" onClick={() => handleModals("codigo")}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PrintCodigoModal;
