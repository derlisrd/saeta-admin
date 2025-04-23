import { Box, Container, LinearProgress, Paper } from "@mui/material";
import TabsCustom from "./_components/tabscustom";
import TabContainer from "./_components/tabcontainer";
import Datos from "./containers/datos";
import Imagenes from "./containers/imagenes";
import useAddProducto from "./_hook/useAddProducto";
import NotificacionSnack from "@/components/common/NotificacionSnack";
import LargeButtonStyled from "@/components/ui/LargeButton";

function AddProductoMain() {
  const { clearSuccess, success, loading, tabValue, sendForm } = useAddProducto();
  // tab value no cambia console.log(tabValue);
  return (
    <Container>
      <Box sx={{ position: "absolute", bottom: 32, right: 32 }}>
        <LargeButtonStyled onClick={sendForm}>Guardar</LargeButtonStyled>
      </Box>

      <NotificacionSnack open={success.active} onClose={clearSuccess} message={success.message} severity="info" />

      <Box boxShadow={4} borderRadius={4} component={Paper} mb={6} padding={{ xs: 0, sm: 1, md: 2 }}>
        {loading && <LinearProgress sx={{ margin: "18px" }} />}
        <TabsCustom />
        <TabContainer index={0} tabValue={tabValue}>
          <Datos />
        </TabContainer>
        <TabContainer index={1} tabValue={tabValue}>
          <Imagenes />
        </TabContainer>
      </Box>
    </Container>
  );
}

/**
 * 
 * <Box sx={{ position: "fixed", bottom: 24, zIndex: 1000, right: 24 }} bgcolor="background.paper" boxShadow={3} borderRadius={2} p={2}>
        <Stack direction="row" spacing={1}>
          <Button size="large" onClick={sendForm}>
            GUARDAR
          </Button>
        </Stack>
      </Box>
 */

export default AddProductoMain;
