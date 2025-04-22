import { Dialog, DialogContent, DialogTitle, Grid2 as Grid, Autocomplete, DialogActions, Button, TextField } from "@mui/material";
import useModal from "../_hooks/useModal";
import useBuscarProducto from "../_hooks/useBuscarProducto";
import { ProductoResults } from "@/services/dto/productos/producto";
import useHook from "../_hooks/useHook";

function BuscarProductoModal() {
  const { modal, handleModal } = useModal();
  const { consultarCodigoInsertar } = useHook();
  const { listaBusqueda, isLoading, setQ } = useBuscarProducto(1);

  const handleSelectProducto = (producto: ProductoResults | null) => {
    if (producto) {
      consultarCodigoInsertar(producto.codigo);
      handleModal("productos");
    }
  };

  return (
    <Dialog fullWidth open={modal.productos} onClose={() => handleModal("productos")} disableRestoreFocus>
      <DialogTitle>Buscar producto</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} pt={1}>
          <Grid size={12}>
            <Autocomplete
              onChange={(_, value) => {
                handleSelectProducto(value);
              }}
              getOptionLabel={(option: ProductoResults) => `${option.codigo} - ${option.nombre}`}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={listaBusqueda}
              loading={isLoading}
              loadingText="Buscando..."
              noOptionsText="No se encontraron resultados"
              renderInput={(params) => <TextField {...params} placeholder="Buscar producto..." autoFocus onChange={(e) => e.target.value && setQ(e.target.value)} />}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => handleModal("productos")}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BuscarProductoModal;
