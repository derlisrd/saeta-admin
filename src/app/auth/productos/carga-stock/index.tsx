import useBuscaProducto from "@/core/hooks/productos/stock/useBuscaProducto";
import useCargaStock from "@/core/hooks/productos/stock/useCargaStock";
import useNotificacionSnack from "@/hooks/useNotificacionSnack";
import { Box, Container, Grid2 as Grid, LinearProgress, Paper, Slide } from "@mui/material";
import { useState, useDeferredValue } from "react";
import StockForm from "./_containers/stock";
import Reponer from "./_containers/reponer";
import AgregarStock from "./_containers/agregar";
import NotificacionSnack from "@/components/common/NotificacionSnack";
import { validarFormularioStock } from "@/core/utils/stock/validatorCorregirStock";
import { ProductoResults } from "@/services/dto/productos/producto";

function CargaStock() {
  const [selectedDeposito, setSelectedDeposito] = useState<number>(0);
  const [selectedProducto, setSelectedProducto] = useState<ProductoResults | null>(null);
  const [search, setSearch] = useState<string>("");

  const deferredSearch = useDeferredValue(search);

  const { depositos, consultarStock, isLoading, results, setResults } = useCargaStock();
  const { loadingBusqueda, listaBusqueda } = useBuscaProducto(deferredSearch);
  const { snackbarOpen, snackbarMessage, snackbarSeverity, mostrarNotificacion, cerrarNotificacion } = useNotificacionSnack();

  // Función para resetear el formulario
  const resetForm = () => {
    setSelectedProducto(null);
    setSearch("");
    setResults(undefined);
  };

  const handleProductoChange = (producto: ProductoResults | null) => setSelectedProducto(producto);

  // Validación de formulario
  const validarFormulario = () => {
    if (selectedProducto && !validarFormularioStock(selectedDeposito, selectedProducto.id)) {
      mostrarNotificacion("Debe seleccionar un depósito y un producto", "warning");
      return false;
    }
    return true;
  };

  const handleConsultar = () => {
    if (selectedProducto && validarFormulario()) {
      consultarStock(selectedDeposito, selectedProducto.id);
    }
  };

  return (
    <Container>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box component={Paper} boxShadow={4} borderRadius={4} mb={6} padding={{ xs: 0, sm: 1, md: 2 }}>
          <Grid container spacing={1} alignItems="center">
            <Grid size={12}>
              <h4>Seleccione el depósito y ingrese la cantidad del producto</h4>
            </Grid>
            <Grid size={12}>{isLoading && <LinearProgress sx={{ mb: 4 }} />}</Grid>

            {/* Formulario de búsqueda */}
            <Grid size={12}>
              <StockForm
                depositos={depositos}
                listaBusqueda={listaBusqueda}
                search={search}
                selectedDeposito={selectedDeposito}
                selectedProducto={selectedProducto}
                loadingBusqueda={loadingBusqueda}
                isLoading={isLoading}
                onDepositoChange={setSelectedDeposito}
                onProductoChange={handleProductoChange}
                onSearchChange={setSearch}
                onConsultar={handleConsultar}
                validarFormulario={validarFormulario}
              />
            </Grid>

            {/* Componentes para reponer o agregar stock */}
            <Grid size={12}>
              {selectedProducto && (
                <h3>
                  {selectedProducto.nombre} {selectedProducto.codigo}
                </h3>
              )}
              {results && results !== null && (
                <Reponer
                  results={results}
                  onSuccess={() => {
                    resetForm();
                    mostrarNotificacion("Stock corregido exitosamente", "success");
                  }}
                  onError={(mensaje) => mostrarNotificacion(mensaje, "error")}
                />
              )}
              {results == null && results !== undefined && (
                <AgregarStock
                  deposito_id={selectedDeposito}
                  producto_id={selectedProducto ? selectedProducto.id : 0}
                  onSuccess={() => {
                    resetForm();
                    mostrarNotificacion("Stock agregado exitosamente", "success");
                  }}
                  onError={(mensaje) => mostrarNotificacion(mensaje, "error")}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Slide>
      <NotificacionSnack open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} onClose={cerrarNotificacion} />
    </Container>
  );
}

export default CargaStock;
