
import { Box, Breadcrumbs, Container, LinearProgress, Paper, Slide, Typography } from "@mui/material";

import LargeButtonStyled from "@/components/ui/LargeButton";
import TabsCustom from "@/core/components/productos/tabscustom";
import { useEditProductoContext } from "./provider";
import TabContainer from "@/components/containers/tabcontainer";
import Datos from "./_containers/datos";


function EditProductoMain() {

  const { tabValue, setTabValue, isLoading, sendEditProducto } = useEditProductoContext();



  return (
    <Container>
      <Breadcrumbs separator="›">
        <Typography variant="overline">Producto</Typography>
        <Typography variant="overline">Editar</Typography>
      </Breadcrumbs>
      <Box sx={{ position: "fixed", bottom: 32, right: 32, zIndex: 100 }}>
        <LargeButtonStyled onClick={() => { sendEditProducto() }}>Guardar</LargeButtonStyled>
      </Box>

      {/* <NotificacionSnack open={success.active} onClose={clearSuccess} message={success.message} severity="info" /> */}

      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box boxShadow={4} borderRadius={4} component={Paper} mb={6} padding={{ xs: 0, sm: 1 }}>
          {isLoading && <LinearProgress sx={{ margin: "18px" }} />}
          <TabsCustom setTabValue={setTabValue} tabValue={tabValue} />
          <TabContainer index={0} tabValue={tabValue}>
            <Datos />
          </TabContainer>
        </Box>
      </Slide>
    </Container>
  );
}

export default EditProductoMain;
