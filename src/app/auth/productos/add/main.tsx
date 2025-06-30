import { Box, Container, LinearProgress, Paper, Slide } from "@mui/material";
import Datos from "./containers/datos";
import Imagenes from "./containers/imagenes";
import useAddProducto from "./_hook/useAddProducto";
import NotificacionSnack from "@/components/common/NotificacionSnack";
import LargeButtonStyled from "@/components/ui/LargeButton";
import TabContainer from "@/components/containers/tabcontainer";
import { useEffect } from "react";
import { showAlert } from "@/core/utils/alert";
import Atributos from "./containers/atributos";
import TabsCustom from "@/core/components/productos/tabscustom";


function AddProductoMain() {
  const { clearSuccess, success, loading, tabValue, sendForm, dataError, setTabValue } = useAddProducto();

  useEffect(() => {
    if (dataError) {
      showAlert({
        title: 'Atención',
        message: dataError.message,
        type: "error"
      })
    }
  }, [dataError])


  return (
    <Container>
      <Box sx={{ position: "fixed", bottom: 32, right: 32, zIndex: 100 }}>
        <LargeButtonStyled onClick={sendForm}>Guardar</LargeButtonStyled>
      </Box>

      <NotificacionSnack open={success.active} onClose={clearSuccess} message={success.message} severity="info" />

      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box boxShadow={4} borderRadius={4} component={Paper} mb={6} padding={{ xs: 0, sm: 1 }}>
          {loading && <LinearProgress sx={{ margin: "18px" }} />}
          <TabsCustom setTabValue={setTabValue} tabValue={tabValue} />
          <TabContainer index={0} tabValue={tabValue}>
            <Datos />
          </TabContainer>
          <TabContainer index={1} tabValue={tabValue}>
            <Imagenes />
          </TabContainer>
          <TabContainer index={2} tabValue={tabValue}>
            <Atributos />
          </TabContainer>
        </Box>
      </Slide>
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
