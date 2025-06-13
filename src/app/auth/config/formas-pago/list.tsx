import GenericTable from "@/components/table/GenericTable";
import Icon from "@/components/ui/icon";
import { Box, Breadcrumbs, Button, Container, LinearProgress, Slide, Stack, Typography } from "@mui/material";
import ColumnsFormasPago from "./_components/ColumnsFormasPago";
import { useFormasPagoContext } from "./provider";


function FormasPagoList() {

    const { isLoading, handleModals, lista } = useFormasPagoContext()

    return <Container>
        <Breadcrumbs separator="›">
            <Typography variant="overline">Configuración</Typography>
            <Typography variant="overline">Formas de pago</Typography>
        </Breadcrumbs>
        <Stack spacing={2} my={2} direction="row" alignItems="center">
            <Button startIcon={<Icon name='cards' />} onClick={() => handleModals("add")}>
                Agregar
            </Button>
        </Stack>
        {isLoading ? (
            <LinearProgress />
        ) : (
            <Slide direction="down" in mountOnEnter unmountOnExit>
                <Box>
                    <GenericTable data={lista} columns={ColumnsFormasPago({ width: window.innerWidth })} rowHeight={40} headerHeight={36} />
                </Box>
            </Slide>
        )}
    </Container>
}

export default FormasPagoList;