import GenericTable from "@/components/table/GenericTable";
import Icon from "@/components/ui/icon";
import useFormasPago from "@/core/hooks/config/useFormasPago";
import { Box, Breadcrumbs, Button, Container, LinearProgress, Slide, Stack, Typography } from "@mui/material";
import AddModal from "./_modals/add";
import ColumnsFormasPago from "./_components/ColumnsFormasPago";

function FormasPago() {
  const { isLoading, modals, setModals, listado } = useFormasPago();

  return (
    <Container>
      <Breadcrumbs separator="›">
        <Typography variant="overline">Configuración</Typography>
        <Typography variant="overline">Formas de pago</Typography>
      </Breadcrumbs>
      <Stack spacing={2} my={2} direction="row" alignItems="center">
        <Button startIcon={<Icon>cards</Icon>} onClick={() => setModals({ ...modals, add: true })}>
          Agregar
        </Button>
      </Stack>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Slide direction="down" in mountOnEnter unmountOnExit>
          <Box>
            <GenericTable data={listado} columns={ColumnsFormasPago({ width: window.innerWidth })} rowHeight={40} headerHeight={36} />
          </Box>
        </Slide>
      )}
      <AddModal onClose={() => setModals({ ...modals, add: false })} open={modals.add} />
    </Container>
  );
}

export default FormasPago;
