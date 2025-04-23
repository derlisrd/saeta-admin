import useCorregirStock from "@/core/hooks/productos/stock/useCorregirStock";
import { ConsultarStockResults } from "@/services/dto/productos/ConsultarStock";
import { Button, Grid2 as Grid, LinearProgress, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

interface ReponerStockProps {
  results: ConsultarStockResults;
  onSuccess: () => void;
  onError: (mensaje: string) => void;
}

function ReponerStock({ results, onSuccess, onError }: ReponerStockProps) {
  const { setCantidad, corregir, isPending } = useCorregirStock(results.deposito_id, results.producto_id);

  const handleCorregir = async () => {
    try {
      const resultado = await corregir();
      if (resultado && resultado.success) {
        onSuccess();
      } else {
        onError(resultado?.message || "Error al corregir el stock");
      }
    } catch (error) {
      onError("Error al procesar la solicitud");
    }
  };

  return (
    <Grid container columnSpacing={2} alignItems="center">
      <Grid size={12}>
        <h3>Para corregir el stock ingrese la cantidad correcta</h3>
      </Grid>
      <Grid size={12}>{isPending && <LinearProgress sx={{ mb: 4 }} />}</Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <NumericFormat
          disabled={isPending}
          customInput={TextField}
          thousandSeparator="."
          decimalSeparator=","
          placeholder="Cantidad"
          name="cantidad"
          onValueChange={(e) => {
            e.floatValue && setCantidad(e.floatValue);
          }}
          value={results.cantidad}
          fullWidth
          required
          label="Cantidad"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Button onClick={handleCorregir} disabled={isPending}>
          Corregir
        </Button>
      </Grid>
    </Grid>
  );
}

export default ReponerStock;
