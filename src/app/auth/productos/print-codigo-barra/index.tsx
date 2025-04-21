import Barcode from "react-barcode";
import { Button, Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useAuth } from "@/providers/AuthProvider";
import Icon from "@/components/ui/icon";

function PrintCodigoBarra() {
  const [searchParams] = useSearchParams();
  const { userData } = useAuth();

  const impresoraWidth = userData?.impresoras?.[0]?.mm ? `${userData.impresoras[0].mm}mm` : "100%";
  const codigoValue = searchParams.get("codigo") || "no-code";
  const contentRef = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({ contentRef, ignoreGlobalStyles: true });
  return (
    <Container>
      <h3>Imprimir código de barras</h3>
      <div ref={contentRef} style={{ fontFamily: "monospace", color: "#000 !important", width: impresoraWidth, maxWidth: impresoraWidth, marginTop: "10px" }}>
        <Barcode value={codigoValue} font="monospace" background="#ffffff" format="CODE128" />
      </div>
      <Button sx={{ mt: 2 }} startIcon={<Icon>printer</Icon>} color="primary" onClick={() => print()}>
        Imprimir
      </Button>
    </Container>
  );
}

export default PrintCodigoBarra;
