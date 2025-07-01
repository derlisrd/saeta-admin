import { useState } from "react";
import useImpresoras from "@/core/hooks/config/useImpresoras";
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, Grid, TextField, CircularProgress, Alert } from "@mui/material";
import { Impresora } from "@/services/dto/config/impresora";
import { useAuth } from "@/providers/AuthProvider";

interface AddModalImpresoraProps {
  open: boolean;
  onClose: () => void;
}

function AddModalImpresora({ open, onClose }: AddModalImpresoraProps) {
  const { insertar, isLoading } = useImpresoras();
  const { userData } = useAuth();
  const [nombre, setNombre] = useState("");
  const [mm, setMm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setError(null);
      if (!nombre.trim()) {
        setError("El nombre es obligatorio");
        return;
      }

      const mmValue = parseFloat(mm);
      if (isNaN(mmValue) || mmValue <= 0) {
        setError("Ingrese un valor numérico válido para los milímetros");
        return;
      }

      const nuevaImpresora = new Impresora({
        id: null,
        nombre: nombre.trim(),
        mm: mmValue,
        activo: true,
        sucursal_id: userData && userData.user.sucursal_id, // Asume que esto se asigna en el backend o ajústalo según necesites
      });

      await insertar(nuevaImpresora);
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Error al guardar la impresora. Intente nuevamente.");
    }
  };

  const resetForm = () => {
    setNombre("");
    setMm("");
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar impresora</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}
        <Grid container spacing={2} mt={1}>
          <Grid size={12}>
            <TextField label="Nombre" fullWidth value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={isLoading} />
          </Grid>
          <Grid size={12}>
            <TextField label="Milímetros en número" fullWidth type="number" value={mm} onChange={(e) => setMm(e.target.value)} disabled={isLoading} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : "Agregar"}
        </Button>
        <Button onClick={handleClose} disabled={isLoading} variant="outlined">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default AddModalImpresora;
