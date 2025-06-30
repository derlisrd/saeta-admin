import { Box, Breadcrumbs, Container, LinearProgress, Paper, Slide, Typography, Alert } from "@mui/material";
import TabsCustom from "@/core/components/productos/tabscustom";
import { useEditProductoContext } from "./provider";
import TabContainer from "@/components/containers/tabcontainer";
import Datos from "./_containers/datos";
import NotificacionSnack from "@/components/common/NotificacionSnack";
import SenderFormEdit from "./_components/sendFormEdit";

function EditProductoMain() {
  const {
    tabValue,
    setTabValue,
    isLoading,
    success,
    error,
  } = useEditProductoContext();






  return (
    <Container>
      <Breadcrumbs separator="›">
        <Typography variant="overline">Producto</Typography>
        <Typography variant="overline">Editar</Typography>
      </Breadcrumbs>

      {/* Mostrar errores del servidor */}
      {error.code > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message}
        </Alert>
      )}

      <SenderFormEdit />

      <NotificacionSnack open={success.active} onClose={() => { }} message={success.message} severity="success" />

      {isLoading ? (
        <LinearProgress sx={{ margin: "18px" }} />
      ) : (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Box boxShadow={4} borderRadius={4} component={Paper} mb={6} padding={{ xs: 0, sm: 1 }}>
            <TabsCustom setTabValue={setTabValue} tabValue={tabValue} />
            <TabContainer index={0} tabValue={tabValue}>
              <Datos />
            </TabContainer>
          </Box>
        </Slide>
      )}
    </Container>
  );
}

export default EditProductoMain;