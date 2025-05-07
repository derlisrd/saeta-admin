import { Empresa } from "@/services/dto/auth/login";
import { PedidosDelDiaResults } from "@/services/dto/pedidos/pedidosDelDia";
import { format } from "@formkit/tempo";
import { Fragment } from "react";

interface PrintableProps {
  pedido: PedidosDelDiaResults;
  empresa: Empresa | null;
}

function Printable({ pedido, empresa }: PrintableProps) {
  if (!pedido) {
    return (
      <div style={{ backgroundColor: "#fff", padding: "10px", fontFamily: "monospace !important", fontSize: 12, color: "#000 !important" }}>
        No hay datos del pedido para mostrar.
      </div>
    );
  }
  const dashedBorderStyle = {
    borderTop: "1px dashed #ccc",
  };

  const locale = "es-PY";

  return (
    <div style={{ fontFamily: "monospace !important" }}>
      <div style={{ lineHeight: "0.1" }}>
        <h4 style={{ fontWeight: "bold" }}>{empresa && empresa.nombre}</h4>
        <h5>
          {empresa && empresa.direccion} Tel: {empresa && empresa.telefono}
        </h5>
        <h5>Fecha: {format(pedido.created_at, "DD/MM/YYYY")}</h5>
        <h5>Condicion: {pedido.tipo === 1 ? "Credito" : "Contado"}</h5>
      </div>
      <div style={dashedBorderStyle} />
      <div>
        <b>CI/RUC: {pedido.doc || "x"}</b>
        <br />
        <b>Cliente: {pedido.razon_social || "x"}</b>
      </div>
      <div style={{ ...dashedBorderStyle, marginBottom: "16px" }} />

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", columnGap: "8px" }}>
        <div style={{ textAlign: "right", fontWeight: "bold" }}>Cant</div>
        <div style={{ fontWeight: "bold" }}>Descrip.</div>
        <div style={{ textAlign: "right", fontWeight: "bold" }}>Prec.</div>
        {pedido.items &&
          pedido.items.map((item, i) => (
            <Fragment key={i}>
              <div>{item.cantidad}</div>
              <div>{item.nombre}</div>
              <div style={{ textAlign: "right" }}>{item.precio.toLocaleString(locale)}</div>
            </Fragment>
          ))}
      </div>

      <div style={{ ...dashedBorderStyle, marginTop: "16px" }} />
      <div style={{ marginTop: "16px" }}>
        <b style={{ lineHeight: "0.5" }}>Formas de Pago</b>
        <ul>
          {pedido.formas_pago_pedido &&
            pedido.formas_pago_pedido.map((pago) => (
              <li key={pago.id} style={{ lineHeight: "0.5" }}>
                {pago.abreviatura}: {parseFloat(pago.monto).toLocaleString(locale)}
              </li>
            ))}
        </ul>
      </div>

      <div style={{ textAlign: "right", marginTop: "16px", lineHeight: "0.6" }}>
        <p>Subtotal: {pedido.total.toLocaleString(locale)}</p>
        <p>Descuento: -{pedido.descuento.toLocaleString(locale)}</p>
        <p>Importe Final: {pedido.importe_final.toLocaleString(locale)}</p>
      </div>

      <p>Gracias por su compra!</p>
    </div>
  );
}

export default Printable;
