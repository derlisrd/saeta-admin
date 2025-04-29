import useAddUsers from "@/core/hooks/users/useAddUsers";
import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

interface AddUsersModalProps {
  open: boolean;
  onClose: () => void;
}

function AddUsersModal({ open, onClose }: AddUsersModalProps) {
  const [error, setError] = useState<string | null>(null);
  const { isPending } = useAddUsers();

  const handleSubmit = async () => {
    try {
      setError(null);

      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Error al guardar la impresora. Intente nuevamente.");
    }
  };

  const resetForm = () => {
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar usuario</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Nombre" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Usuario" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <TextField label="Email" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Contraseña" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Repetir contraseña" fullWidth />
          </Grid>

          <Grid size={{ xs: 12, sm: 12 }}>
            <Select
              fullWidth
              labelId="formas-label"
              id="formas-select"
              value={0}
              onChange={({ target }) => {
                target.value as number;
              }}
              label="Asignar sucursal"
              name="formas_pago_id"
            >
              <MenuItem value={0} disabled>
                Asignar sucursal
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? <CircularProgress size={24} /> : "Agregar"}
        </Button>
        <Button onClick={handleClose} disabled={isPending} variant="outlined">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUsersModal;
