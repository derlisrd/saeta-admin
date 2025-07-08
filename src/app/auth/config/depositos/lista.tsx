import Icon from "@/components/ui/icon";
import { Box, Breadcrumbs, Button, Chip, Container, IconButton, LinearProgress, Slide, Stack, Tooltip, Typography } from "@mui/material";
import { useDepositosContext } from "./provider";
import GenericTable from "@/components/table/GenericTable";
import { ColumnProps } from "react-virtualized";

function ListaDepositos() {
    const { isLoading, lista, activar, isPending } = useDepositosContext()
    const width = window.innerWidth
    const columnas: ColumnProps[] = [
        {
            label: "codigo",
            dataKey: "id",
            width: width * 0.1,
        },
        {
            label: "nombre",
            dataKey: "nombre",
            width: width * 0.2,
        },
        {
            label: "descripcion",
            dataKey: "descripcion",
            width: width * 0.2,
        },
        {
            label: "activo",
            dataKey: "activo",
            width: width * 0.1,
            cellRenderer: (rowData) => (rowData.rowData.activo === 1 ? <Chip label="Activo" size="small" color="success" /> : <Chip label="Inactivo" size="small" color="warning" />),
        },
        {
            label: "acciones",
            dataKey: "id",
            width: width * 0.1,
            cellRenderer: (rowData) =>
                rowData.rowData.activo === 0 ? (
                    <Tooltip placement="top" arrow title='Activar'>
                        <IconButton
                            onClick={() => {
                                activar(rowData.rowData.id);
                            }}
                        >
                            <Icon name="circle-check" />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <></>
                ),
        },
    ];


    return <Container>
        <Breadcrumbs separator="›">
            <Typography variant="overline">Configuración</Typography>
            <Typography variant="overline">Depósitos</Typography>
        </Breadcrumbs>
        <Stack spacing={2} my={2} direction="row" alignItems="center">
            <Button startIcon={<Icon name='database-plus' />} onClick={() => { }}>
                Agregar
            </Button>
        </Stack>
        {isLoading || isPending ? (
            <LinearProgress />
        ) : (
            <Slide direction="down" in mountOnEnter unmountOnExit>
                <Box>
                    <GenericTable data={lista} columns={columnas} rowHeight={40} headerHeight={36} />
                </Box>
            </Slide>
        )}
    </Container>
}

export default ListaDepositos;