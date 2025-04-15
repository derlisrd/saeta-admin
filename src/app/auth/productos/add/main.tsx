import { Alert, Box, Button, Container, LinearProgress, Paper, Snackbar, Stack } from "@mui/material";
import TabsCustom from "./_components/tabscustom";
import TabContainer from "./_components/tabcontainer";
import Datos from "./containers/datos";
import Imagenes from "./containers/imagenes";
import useAddProducto from "./_hook/useAddProducto";

function AddProductoMain() {
  const { clearSuccess, success, loading, tabValue, sendForm } = useAddProducto();
  // tab value no cambia console.log(tabValue);
  return (
    <Container>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={success.active} autoHideDuration={6000} onClose={clearSuccess}>
        <Alert onClose={clearSuccess} severity="success" variant="filled" sx={{ width: "100%" }}>
          {success.message}
        </Alert>
      </Snackbar>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" my={3}>
        <Button size="large" onClick={sendForm}>
          GUARDAR
        </Button>
      </Stack>
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
