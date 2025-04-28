import useImpresoras from "@/core/hooks/config/useImpresoras";
import { Box, Button, Container, LinearProgress, Stack } from "@mui/material";
import AddModalImpresora from "./_modal/add";
import { useState } from "react";
import GenericTable from "@/components/table/GenericTable";
import columnsImpresoras from "./_components/columnsImpresoras";

function Impresoras() {
  const { lista, isLoading } = useImpresoras();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => setModalOpen(!modalOpen);

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <h3>Impresoras</h3>
        <Button onClick={handleModal}>Nuevo</Button>
      </Stack>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box>
          <GenericTable
            data={lista || []}
            columns={columnsImpresoras({ width: window.innerWidth })} // Pasa el ancho inicial
            rowHeight={40}
            headerHeight={36}
          />
        </Box>
      )}
      <AddModalImpresora open={modalOpen} onClose={handleModal} />
    </Container>
  );
}

export default Impresoras;
