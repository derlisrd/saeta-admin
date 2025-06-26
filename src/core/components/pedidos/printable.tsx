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
      <div style={{ backgroundColor: "#fff", padding: "10px", fontFamily: "monospace !important", color: "#000 !important" }}>
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
          {empresa && empresa.direccion} TEL: {empresa && empresa.telefono}
        </h5>
        <h5>FECHA: {format(pedido.created_at, "DD/MM/YYYY")}</h5>
        <h5>CONDICION: {pedido.condicion === 1 ? "CREDITO" : "CONTADO"}</h5>
        <h5>CODIGO: {pedido.id}</h5>
      </div>
      <div style={dashedBorderStyle} />
      <div>
        <small>CI/RUC: {pedido.doc || "x"}</small>
        <br />
        <small>CLIENTE: {pedido.razon_social || "x"}</small>
      </div>
      <div style={{ ...dashedBorderStyle, marginBottom: "16px" }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto auto", // 3 columnas: descripción flexible, cantidad y precio fijos
          columnGap: "6px",
          rowGap: "4px",
        }}
      >
        {/* Headers */}
        <small style={{ fontWeight: "bold", gridColumn: "1 / -1" }}>Codigo</small>
        <small style={{ fontWeight: "bold" }}>Descrip.</small>
        <small style={{ textAlign: "right", fontWeight: "bold" }}>Cant</small>
        <small style={{ textAlign: "right", fontWeight: "bold" }}>Prec.</small>

        {pedido.items &&
          pedido.items.map((item, i) => (
            <Fragment key={i}>
              {/* Código ocupa toda la fila */}
              <small style={{ textAlign: "left", gridColumn: "1 / -1" }}>{item.codigo}</small>
              {/* Los demás elementos comparten la siguiente fila con línea debajo */}
              <small style={{ borderBottom: "1px solid", paddingBottom: "2px" }}>
                {item.nombre.length > 28 ? item.nombre.substring(0, 28) : item.nombre}
              </small>
              <small style={{ textAlign: "right", borderBottom: "1px solid", paddingBottom: "2px" }}>{item.cantidad}</small>
              <small style={{ textAlign: "right", borderBottom: "1px solid", paddingBottom: "2px" }}>{item.precio.toLocaleString(locale)}</small>
            </Fragment>
          ))}
      </div>

      <div style={{ ...dashedBorderStyle, marginTop: "16px" }} />
      <div style={{ marginTop: "16px" }}>
        <small style={{ lineHeight: "0.5", fontWeight: "bold" }}>Formas de Pago</small>
        <ul>
          {pedido.formas_pago_pedido &&
            pedido.formas_pago_pedido.map((pago) => (
              <li key={pago.id}>
                <small>{pago.abreviatura}: {parseFloat(pago.monto).toLocaleString(locale)}</small>
              </li>
            ))}
        </ul>
      </div>

      <div style={{ textAlign: "right", marginTop: "16px", display: "flex", flexDirection: "column", fontWeight: "bold" }}>
        <small>SUBTOTAL: {pedido.total.toLocaleString(locale)}</small>
        <small>DESCUENTO: -{pedido.descuento.toLocaleString(locale)}</small>
        <small>TOTAL: {pedido.importe_final.toLocaleString(locale)}</small>
      </div>

      <small>Gracias por su compra!</small>
    </div>
  );
}

export default Printable;
