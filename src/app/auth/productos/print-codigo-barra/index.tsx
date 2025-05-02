import Barcode from "react-barcode";
import { Button, Container, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useAuth } from "@/providers/AuthProvider";
import Icon from "@/components/ui/icon";

function PrintCodigoBarra() {
  const [searchParams] = useSearchParams();
  const { userData } = useAuth();

  const [copia, setCopia] = useState(1);
  const [altura, setAltura] = useState(36);
  const [espacio, setEspacio] = useState(0);
  const impresoraWidth = userData?.impresoras?.[0]?.mm ? `${userData.impresoras[0].mm}mm` : "100%";
  const codigo = searchParams.get("codigo") || "no-code";
  const precio = searchParams.get("precio") || "no-precio";
  const contentRef = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({ contentRef, ignoreGlobalStyles: true });

  const restabler = () => {
    setCopia(1);
    setAltura(36);
    setEspacio(0);
  };
  return (
    <Container>
      <h3>Imprimir código de barras</h3>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button onClick={() => setCopia((prev) => prev + 1)}>Agregar copia</Button>
        <Button onClick={() => setAltura((prev) => prev + 1)}>Aumentar altura</Button>
        <Button onClick={() => setAltura((prev) => prev - 1)}>Disminuir altura</Button>
        <Button onClick={() => setEspacio((prev) => prev + 1)}>Aumentar espacio</Button>
        <Button onClick={() => setEspacio((prev) => prev - 1)}>Disminuir espacio</Button>
        <Button onClick={() => restabler()}>restabler</Button>
      </Stack>
      <div
        ref={contentRef}
        style={{
          fontFamily: "monospace",
          textAlign: "center",
          border: "none",
          color: "#000 !important",
          width: impresoraWidth,
          maxWidth: impresoraWidth,
          margin: "12px auto",
          background: "#fff",
          borderRadius: "4px",
        }}
      >
        {Array.from({ length: copia }).map((_, index) => (
          <div key={index}>
            <Barcode value={codigo} height={altura} fontSize={12} font="monospace" background="#ffffff" marginTop={espacio} textMargin={0} format="CODE128" />
            <span style={{ color: "#000", display: "block", fontFamily: "monospace", fontSize: 12 }}>{Number(precio).toLocaleString("es-PY")}</span>
          </div>
        ))}
      </div>
      <Button sx={{ mt: 2 }} startIcon={<Icon>printer</Icon>} color="primary" onClick={() => print()}>
        Imprimir
      </Button>
    </Container>
  );
}

export default PrintCodigoBarra;
