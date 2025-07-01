// src/components/Stock/AgregarStock.tsx
import { Button, Grid, LinearProgress, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useMutation } from "@tanstack/react-query";

interface AgregarStockProps {
  deposito_id: number;
  producto_id: number;
  onSuccess: () => void;
  onError: (mensaje: string) => void;
}

function AgregarStock({ deposito_id, producto_id, onSuccess, onError }: AgregarStockProps) {
  const [cantidad, setCantidad] = useState<number>(0);
  const { userData } = useAuth();

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["agregarStock"],
    mutationFn: () => API.stock.corregiRoReponer(userData && userData.token, deposito_id, producto_id, cantidad),
    onError: () => {
      onError("Error al agregar stock");
    },
  });

  const handleAgregar = async () => {
    if (cantidad <= 0) {
      onError("La cantidad debe ser mayor a 0");
      return;
    }

    try {
      const resultado = await mutateAsync();
      if (resultado && resultado.success) {
        onSuccess();
      } else {
        onError(resultado.message || "Error al agregar el stock");
      }
    } catch (error) {
      onError("Error al procesar la solicitud");
    }
  };

  return (
    <Grid container columnSpacing={2} alignItems="center">
      <Grid size={12}>
        <h3>Agregar stock al producto</h3>
      </Grid>
      <Grid size={12}>{isPending && <LinearProgress sx={{ mb: 3 }} />}</Grid>
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
          value={cantidad}
          fullWidth
          required
          label="Cantidad"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Button onClick={handleAgregar} disabled={isPending}>
          Agregar
        </Button>
      </Grid>
    </Grid>
  );
}

export default AgregarStock;
