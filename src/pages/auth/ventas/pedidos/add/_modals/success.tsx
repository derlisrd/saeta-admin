import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@mui/material";
import useHook from "../_hooks/useHook";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function SuccessModal() {
  const { modal, handleModal, result: data, index, pedidos, limpiarFinalizarPedido } = useHook();

  const contentRef = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({ contentRef, ignoreGlobalStyles: true });

  return (
    <Dialog open={modal.success} maxWidth="xs" fullWidth onClose={() => handleModal("success", false)} TransitionComponent={Slide}>
      <DialogTitle>Detalles de pedido</DialogTitle>
      <DialogContent>
        {data?.results && (
          <div ref={contentRef} style={{ fontFamily: "monospace", color: "#000 !important" }}>
            <table border={1} style={{ borderCollapse: "collapse" }} cellPadding="2" cellSpacing="4" width="100%" align="right">
              <tbody>
                <tr>
                  <td align="right">
                    <b>Pedido número:</b>
                  </td>
                  <td>
                    <b>{data.results.id}</b>
                  </td>
                </tr>
                <tr>
                  <td align="right">
                    <b>Fecha:</b>
                  </td>
                  <td>
                    <b>{data.results.fecha}</b>
                  </td>
                </tr>
                <tr>
                  <td align="right">
                    <b>Cliente:</b>
                  </td>
                  <td>
                    <b>
                      {data.results.cliente.doc} {data.results.cliente.nombres} {data.results.cliente.apellidos}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td>COD.</td>
                          <td>DESC.</td>
                          <td>CAN.</td>
                          <td>SUB.</td>
                        </tr>
                        {pedidos[index].items.map((item, i) => (
                          <tr key={i}>
                            <td>{item.codigo}</td>
                            <td>{item.nombre}</td>
                            <td>{item.cantidad}</td>
                            <td>{item.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => print()}>
          Imprimir
        </Button>
        <Button variant="contained" color="primary" onClick={limpiarFinalizarPedido}>
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SuccessModal;
