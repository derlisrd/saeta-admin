import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@mui/material";
import useHook from "../_hooks/useHook";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useModal from "../_hooks/useModal";
import Icon from "@/components/ui/icon";
import useResponsive from "@/hooks/useResponsive";
import { useAuth } from "@/providers/AuthProvider";
import Printable from "@/core/components/pedidos/printable";

function SuccessModal() {
  const { userData } = useAuth();

  const impresoraWidth = userData?.impresoras?.[0]?.mm ? `${userData.impresoras[0].mm}mm` : "100%";

  const { result: data, index, pedidos, limpiarFinalizarPedido } = useHook();
  const { isSmDown } = useResponsive();
  const { modal, clearAllModals } = useModal();

  const contentRef = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({ contentRef, ignoreGlobalStyles: true });

  const cerrar = () => {
    clearAllModals();
    limpiarFinalizarPedido();
  };

  if (!data || data.results === null) return null;
  console.log(data);
  const pedido = {
    id: data.results.id,
    fecha: data.results.fecha,
    created_at: "",
    total: data.results.total,
    estado: data.results.estado,
    razon_social: data.results.cliente.razon_social,
    doc: data.results.cliente.doc,
    descuento: data.results.descuento,
    importe_final: data.results.importe_final,
    items: pedidos[index].items.map((item) => ({
      ...item,
      impuesto_descripcion: "",
      impuesto_valor: 0,
    })),
    formas_pago_pedido: data.results.formas_pago_pedido.map((forma) => ({
      ...forma,
      monto: forma.monto.toString(),
    })),
  };

  return (
    <Dialog open={modal.success} maxWidth="sm" fullScreen={isSmDown} fullWidth onClose={cerrar} TransitionComponent={Slide}>
      <DialogTitle>Detalles de pedido</DialogTitle>
      <DialogContent>
        {data?.results && (
          <div ref={contentRef} style={{ fontFamily: "monospace", color: "#000 !important", width: impresoraWidth, maxWidth: impresoraWidth, margin: "0 auto" }}>
            <Printable empresa={userData && userData.empresa} pedido={pedido} />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button startIcon={<Icon>printer</Icon>} color="primary" onClick={() => print()}>
          Imprimir
        </Button>
        <Button variant="outlined" endIcon={<Icon>check</Icon>} color="primary" onClick={cerrar}>
          Listo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default SuccessModal;
